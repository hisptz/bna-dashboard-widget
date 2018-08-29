import {DatasetElement} from './root-cause-analysis-configurations';

export interface RootCauseAnalysisData {
  widgetId: string;
  dataId: string;
  dataValues: {
    [cellId: string]: string
  };
}
