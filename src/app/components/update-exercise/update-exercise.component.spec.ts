import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExerciseComponent } from './update-exercise.component';

describe('UpdateExerciseComponent', () => {
  let component: UpdateExerciseComponent;
  let fixture: ComponentFixture<UpdateExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateExerciseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
