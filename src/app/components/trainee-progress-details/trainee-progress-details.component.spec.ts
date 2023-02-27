import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeProgressDetailsComponent } from './trainee-progress-details.component';

describe('TraineeProgressDetailsComponent', () => {
  let component: TraineeProgressDetailsComponent;
  let fixture: ComponentFixture<TraineeProgressDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineeProgressDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeProgressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
