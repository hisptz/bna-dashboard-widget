import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { RootCauseAnalysisConfigurationsService } from './root-cause-analysis-configurations.service';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, forkJoin, of } from 'rxjs';
import { RootCauseAnalysisData } from '../store/models/root-cause-analysis-data.model';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class RootCauseAnalysisDataService {
  configurationId: string;
  private _dataStoreUrl = 'dataStore/rca-data';
  constructor(
    private http: NgxDhis2HttpClientService,
    public rcaConfigurationService: RootCauseAnalysisConfigurationsService
  ) {
    this.configurationId = rcaConfigurationService.getConfigurationId();
  }

  addRootCauseAnalysisData(rootCauseAnalysisData) {
    return this.http.post(
      `${this._dataStoreUrl}/${rootCauseAnalysisData.configurationId}_${
        rootCauseAnalysisData.id
      }`,
      rootCauseAnalysisData
    );
  }

  deleteRootCauseAnalysisData(rootCauseAnalysisData) {
    console.log(rootCauseAnalysisData);
    return this.http.delete(
      `${this._dataStoreUrl}/${rootCauseAnalysisData.configurationId}_${
        rootCauseAnalysisData.id
      }`
    );
  }

  updateRootCauseAnalysisData(rootCauseAnalysisData: RootCauseAnalysisData) {
    return this.http.put(
      `${this._dataStoreUrl}/${rootCauseAnalysisData.configurationId}_${
        rootCauseAnalysisData.id
      }`,
      rootCauseAnalysisData
    );
  }

  saveRootCauseAnalysisData(rootCauseAnalysisData: RootCauseAnalysisData) {
    const newRootCauseAnalysisData = _.omit(rootCauseAnalysisData, [
      'showEditNotification',
      'isActive',
      'unsaved',
      'isNew'
    ]);

    return rootCauseAnalysisData.isNew
      ? this.addRootCauseAnalysisData(newRootCauseAnalysisData)
      : this.updateRootCauseAnalysisData(newRootCauseAnalysisData);
  }

  getRootCauseAnalysisData(configurationId: string) {
    return this.http.get(this._dataStoreUrl).pipe(
      switchMap((dataIds: string[]) => {
        const filteredDataIds = _.filter(dataIds, (dataId: string) => {
          const spliteDataId = dataId.split('_');
          return configurationId === spliteDataId[0];
        });
        return forkJoin(
          _.map(filteredDataIds, (dataId: string) =>
            this.http.get(`${this._dataStoreUrl}/${dataId}`)
          )
        );
      }),
      catchError((error: any) => {
        if (error.status !== 404) {
          return throwError(error);
        }
        return of([]);
      })
    );
  }
}
