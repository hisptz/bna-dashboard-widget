export interface RootCauseAnalysisData {
  id: string;
  configurationId: string;
  dataValues: { [id: string]: string };
  isActive?: boolean;
}
