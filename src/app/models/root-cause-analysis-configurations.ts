export interface RootCauseAnalysisConfigurations {
  id: string;
  configurationName: string;
  datasetElements: [DatasetElement];
}

export interface DatasetElement {
  dataElementId: string;
  dataElementName: string;
  valueType: string;
  isLabel: boolean;
  isInput: boolean;
  isSelect: boolean;
}
