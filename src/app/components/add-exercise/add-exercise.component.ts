import { UserService } from './../../_services/user.service';
import { ExerciceService } from './../../_services/exercice-service.';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Exercise } from './../../models/exercise';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserExerciserReq } from 'src/app/models/user-exerciser-req';
import { UserExerciseService } from 'src/app/_services/user-exercise.service';
import { UserValidatorService } from 'src/app/_services/user-validator.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css'],
})
export class AddExerciseComponent implements OnInit {
  exerciser!: Exercise;
  exerciseForm: FormGroup;
  traineeList: User[];

  constructor(
    private router: Router,
    private exerciseService: ExerciceService,
    private userService: UserService,
    private userExerciseService: UserExerciseService,
    public customeValidationService: UserValidatorService
  ) {
    this.exerciser = new Exercise();
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.exerciseForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      maximum_time: new FormControl('', [Validators.required]),
      tasks: new FormArray([
        new FormGroup({
          task: new FormControl('', [Validators.required]),
        }),
      ]),
    });
  }

  addTask() {
    const control = <FormArray>this.exerciseForm.controls['tasks'];
    control.push(
      new FormGroup({
        task: new FormControl('', [Validators.required]),
      })
    );
  }

  removeTask(index) {
    const control = <FormArray>this.exerciseForm.controls['tasks'];
    control.removeAt(index);
  }

  onclickSave() {
    if (this.exerciseForm.valid) {
      const subtasks = [];
      this.exerciseForm.value.tasks.forEach((element) => {
        subtasks.push(element.task);
      });
      this.exerciser.title = this.exerciseForm.value.title;
      this.exerciser.tasks = subtasks;
      this.exerciser.description = this.exerciseForm.value.description;
      this.exerciser.maximum_time = this.exerciseForm.value.maximum_time;
      this.exerciseService.addExercise(this.exerciser).subscribe(
        (response1: any) => {
          const createdExercise = response1;
          this.userService.getAllTrainees().subscribe((response2: any) => {
            this.traineeList = response2;
            let userExercise = new UserExerciserReq();
            userExercise.Assined_Date = null;
            userExercise.Completed_Date = null;
            userExercise.comment = '';
            userExercise.status = 'Not Started';
            userExercise.exercise = createdExercise.id;
            this.traineeList.forEach((trainee) => {
              userExercise.traineeId = trainee.id;
              this.userExerciseService
                .addUserExercise(userExercise)
                .subscribe((reponse3: any) => {
                  this.router.navigate(['/exercise-list']);
                });
            });
          });
        },
        (error) => {
          alert('Exercise Adding faield');
        }
      );
    } else {
      this.customeValidationService.validateAllFormFields(this.exerciseForm);
    }
  }
}
