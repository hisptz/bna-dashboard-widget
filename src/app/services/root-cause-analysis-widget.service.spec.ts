import { TestBed, inject } from '@angular/core/testing';

import { RootCauseAnalysisWidgetService } from './root-cause-analysis-widget.service';

describe('RootCauseAnalysisWidgetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RootCauseAnalysisWidgetService]
    });
  });

  it('should be created', inject([RootCauseAnalysisWidgetService], (service: RootCauseAnalysisWidgetService) => {
    expect(service).toBeTruthy();
  }));
});
