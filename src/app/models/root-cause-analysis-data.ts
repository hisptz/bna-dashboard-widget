export interface RootCauseAnalysisData {
  id: string;
  configurationId: string;
  isActive: boolean;
  dataValues: {
    orgUnitName: string;
    orgUnitId: string;
    periodName: string;
    periodId: string;
    interventionName: string;
    interventionId: string;
    bottleneckName: string;
    bottleneckId: string;
    indicatorName: string;
    indicatorId: string;
  };
  showDeleteNotification: boolean;
}
