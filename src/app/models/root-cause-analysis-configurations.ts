export interface RootCauseAnalysisConfigurations {
  configurationId: string;
  configurationName: string;
  datasetElements: {
    [key: string]: DatasetElement
  };
}

export interface DatasetElement {
  dataElementId: string;
  dataElementName: string;
  valueType: string;
  isLabel: boolean;
  isInput: boolean;
  isSelect: boolean;
}
