import { ExerciceService } from './../../_services/exercice-service.';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Exercise } from './../../models/exercise';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-update-exercise',
  templateUrl: './update-exercise.component.html',
  styleUrls: ['./update-exercise.component.css'],
})
export class UpdateExerciseComponent implements OnInit {
  exerciser!: Exercise;
  exerciseForm: FormGroup;
  traineeList: User[];

  constructor(
    private router: Router,
    private exerciseService: ExerciceService,
    private actrouter: ActivatedRoute
  ) {
    this.exerciser = new Exercise();
    this.createForm();
  }

  ngOnInit(): void {
    this.actrouter.queryParams.subscribe((params: any) => {
      this.exerciser = JSON.parse(params.data);
      console.log(this.exerciser);
    });
    this.patchForm();
  }

  patchForm() {
    if (this.exerciser.id != null) {
      const control = <FormArray>this.exerciseForm.controls['tasks'];
      this.exerciser.tasks.forEach((element) => {
        control.push(
          new FormGroup({
            task: new FormControl(element),
          })
        );
      });
      this.exerciseForm.patchValue({
        title: this.exerciser.title,
        description: this.exerciser.description,
        maximum_time: this.exerciser.maximum_time,
      });
    }
  }

  createForm() {
    this.exerciseForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      description: new FormControl(''),
      maximum_time: new FormControl(''),
      tasks: new FormArray([]),
    });
  }

  addTask() {
    const control = <FormArray>this.exerciseForm.controls['tasks'];
    control.push(
      new FormGroup({
        task: new FormControl(''),
      })
    );
  }

  removeTask(index) {
    const control = <FormArray>this.exerciseForm.controls['tasks'];
    control.removeAt(index);
  }

  onclickSave() {
    const subtasks = [];

    this.exerciseForm.value.tasks.forEach((element) => {
      subtasks.push(element.task);
    });

    this.exerciser.title = this.exerciseForm.value.title;
    this.exerciser.tasks = subtasks;
    this.exerciser.description = this.exerciseForm.value.description;
    this.exerciser.maximum_time = this.exerciseForm.value.maximum_time;

    this.exerciseService
      .updateExercise(this.exerciser, this.exerciser.id)
      .subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['/exercise-list']);
      });
  }
}
