import { DataElement } from './data-element.model';

export interface RootCauseAnalysisConfiguration {
  name: string;
  id: string;
  dataElements: DataElement[];
}
