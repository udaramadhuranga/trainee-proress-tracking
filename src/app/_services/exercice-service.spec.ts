import { TestBed } from '@angular/core/testing';

import { ExerciceService } from './exercice-service.';

describe('ExerciceServiceService', () => {
  let service: ExerciceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
