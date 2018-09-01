export interface RootCauseAnalysisConfigurations {
    name: string;
    id : string;
    dataElement: [{
      name: string;
      id: string;
      valueType: string;
      optionSetValue: boolean;
      optionSet?: {
        option: [{
          id: string;
          name: string;
          code: number;
       }]
     };
     categoryCombo: {
        id: string;
        name: string;
        categoryOptionCombos :[
          {
          id: string;
          name : string;
          }
        ]
      }
      }]
   }