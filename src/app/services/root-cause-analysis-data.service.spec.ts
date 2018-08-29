import { TestBed, inject } from '@angular/core/testing';

import { RootCauseAnalysisDataService } from './root-cause-analysis-data.service';

describe('RootCauseAnalysisDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RootCauseAnalysisDataService]
    });
  });

  it('should be created', inject([RootCauseAnalysisDataService], (service: RootCauseAnalysisDataService) => {
    expect(service).toBeTruthy();
  }));
});
