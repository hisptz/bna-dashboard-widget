import { TestBed, inject } from '@angular/core/testing';

import { RootCauseAnalysisConfigurationsService } from './root-cause-analysis-configurations.service';

describe('RootCauseAnalysisConfigurationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RootCauseAnalysisConfigurationsService]
    });
  });

  it('should be created', inject([RootCauseAnalysisConfigurationsService], (service: RootCauseAnalysisConfigurationsService) => {
    expect(service).toBeTruthy();
  }));
});
