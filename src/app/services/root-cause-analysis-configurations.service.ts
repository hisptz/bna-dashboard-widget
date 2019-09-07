import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import * as _ from 'lodash';
import { throwError, zip } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { defaultDataSetElementDetails } from '../constants/default-configurations';
import { RootCauseAnalysisConfiguration } from '../store/models/root-cause-analysis-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class RootCauseAnalysisConfigurationsService {
  private _dataStoreUrl: string;
  constructor(private http: NgxDhis2HttpClientService) {
    this._dataStoreUrl = 'dataStore/rca-config';
  }
  getConfigurationId() {
    return 'rcaconfig';
  }
  getAllConfigurations(configurationId: string) {
    return this.http.get(this._dataStoreUrl).pipe(
      switchMap((configurationIds: string[]) =>
        zip(
          ..._.map(configurationIds, (configId: string) =>
            this.http.get(`${this._dataStoreUrl}/${configId}`)
          )
        )
      ),
      catchError((error: any) => {
        if (error.status !== 404) {
          return throwError(error);
        }

        const configurationObject: RootCauseAnalysisConfiguration = {
          id: configurationId,
          name: 'Root Cause Analysis Widget',
          dataElements: defaultDataSetElementDetails
        };
        return this.http
          .post(
            `${this._dataStoreUrl}/${configurationObject.id}`,
            configurationObject
          )
          .pipe(map(() => [configurationObject]));
      })
    );
  }
}
