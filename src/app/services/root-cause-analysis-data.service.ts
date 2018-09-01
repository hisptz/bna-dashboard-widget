import { Injectable } from "@angular/core";
import { NgxDhis2HttpClientService } from "@hisptz/ngx-dhis2-http-client";
import { RootCauseAnalysisConfigurationsService } from "./root-cause-analysis-configurations.service";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { Observable, throwError, forkJoin, of } from "rxjs";
import * as helper from "../helpers";
import { RootCauseAnalysisData } from "../models/root-cause-analysis-data";
import * as _ from "lodash";
@Injectable({
  providedIn: "root"
})
export class RootCauseAnalysisDataService {
  configurationId: string;
  constructor(
    private http: NgxDhis2HttpClientService,
    public rcaConfigurationService: RootCauseAnalysisConfigurationsService
  ) {
    this.configurationId = rcaConfigurationService.getConfigurationId();
  }

  addData(payload) {
    return this.http.post(
      `dataStore/rca-data/${payload.configurationId}_${payload.id}`,
      payload
    );
  }

  deleteData(payload) {
    return this.http.delete(
      `dataStore/rca-data/${payload.configurationId}_${payload.id}`
    );
  }

  updateData(payload, editedSnippet) {
    return this.http.put(
      `dataStore/rca-data/${payload.configurationId}_${payload.id}`,
      _.omit(payload, ["showDeleteNotification"])
    );
  }

  getData() {
    return this.http.get(`dataStore/rca-data/`).pipe(
      switchMap((setOfData: string[]) =>
        forkJoin(
          _.map(setOfData, (data: string[]) =>
            this.http.get(`dataStore/rca-data/${data}`)
          )
        )
      ),
      catchError((error: any) => {
        if (error.status !== 404) {
          return throwError(error);
        }
        return of([]);
      })
    );
  }
}

// const initialDataObject : any =
//           {
//             "orgUnitName": params.orgUnitName,
//             "orgUnitId": params.orgUnitId,
//             "periodName": params.periodName,
//             "periodId": params.periodId,
//             "interventionName": params.interventionName,
//             "interventionId": params.interventionId,
//             "bottleneckName": params.bottleneckName,
//             "bottleneckId": params.bottleneckId,
//             "indicatorName": params.indicatorName,
//             "indicatorId": params.indicatorId,
//             "rootCause": "",
//             "solution": ""
//           }

// const dataObject: RootCauseAnalysisData = {
//   id: helper.generateUid(),
//   configurationId: this.configurationId,
//   isActive: true,
//   dataValues: initialDataObject,
//   showDeleteNotification: false
// };

// return this.http.post('dataStore/rca-data/' + dataObject.configurationId + '_' + dataObject.id , _.omit(dataObject,['showDeleteNotification'])).pipe(map((error) => {
//   this.http.get('dataStore/rca-config/' + dataObject.configurationId + '_' + dataObject.id)
// }))
