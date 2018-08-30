import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService} from '@hisptz/ngx-dhis2-http-client';
import { RootCauseAnalysisConfigurations } from '../models/root-cause-analysis-configurations';
import * as helper from '../helpers/index';
import {catchError,map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RootCauseAnalysisConfigurationsService {

  constructor(private http: NgxDhis2HttpClientService) { }
  getConfigurationId(){
    return 'myrcaconfig';
  }
  getConfiguration(configurationId) {
    return this.http.get(`dataStore/rca-config/${configurationId}`).pipe(catchError((error: any) => {
      if (error.status !== 404) {
              return throwError(error);
      }
      const dataSetElementDetails: any = [
        {
          name: "OrgUnit",
          id: helper.generateUid(),
          valueType: "AUTO_FILLED",
          optionSetValue: false,
          categoryCombo: {
              id: helper.generateUid(),
              name: "default",
              categoryOptionCombos: [
              {
                id: helper.generateUid(),
                name: " default"
              }
            ]
          }
        },
        {
          name: "Period",
          id: helper.generateUid(),
          valueType: "AUTO_FILLED",
          optionSetValue: false,
          categoryCombo: {
              id: helper.generateUid(),
              name: "default",
              categoryOptionCombos: [
              {
                id: helper.generateUid(),
                name: " default"
              }
            ]
          }
        },
        {
          name: "Intervention",
          id: helper.generateUid(),
          valueType: "AUTO_FILLED",
          optionSetValue: false,
        categoryCombo: {
            id: helper.generateUid(),
            name: "default",
            categoryOptionCombos: [
            {
              id: helper.generateUid(),
              name: " default"
            }
          ]
        }
      },
        {
          name: "Bottleneck",
          id: helper.generateUid(),
          valueType: "TEXT",
          optionSetValue: false,
        categoryCombo: {
            id: helper.generateUid(),
            name: "default",
            categoryOptionCombos: [
                {
                  id: helper.generateUid(),
                  name: " default"
                }
              ]
            }
          },
          {
            name: "Indicator",
            id: helper.generateUid(),
            valueType: "TEXT",
            optionSetValue: false,
          categoryCombo: {
              id: helper.generateUid(),
              name: "default",
              categoryOptionCombos: [
              {
                id: helper.generateUid(),
                name: " default"
              }
            ]
          }
        },
        {
          name: "Root cause",
          id: helper.generateUid(),
          valueType: "TEXT",
          optionSetValue: false,
        categoryCombo: {
            id: helper.generateUid(),
            name: "default",
            categoryOptionCombos: [
            {
              id: helper.generateUid(),
              name: " default"
            }
          ]
        }
      },
      {
        dataElementName: "Solution",
        dataElementId: helper.generateUid(),
        valueType: "TEXT",
        optionSetValue: false,
      categoryCombo: {
          id: helper.generateUid(),
          name: "default",
          categoryOptionCombos: [
          {
            id: helper.generateUid(),
            name: " default"
          }
        ]
      }
      }
      ];
      const configurationObject: RootCauseAnalysisConfigurations = {id: configurationId, configurationName:"Root Cause Analysis Widget", datasetElements: dataSetElementDetails };
        return this.http.post('dataStore/rca-config/' + configurationObject.id, configurationObject).pipe(map(() => {
          this.http.get(`dataStore/rca-config/${configurationId}`)
        }
      )
      );
  })
  )
  }

}
