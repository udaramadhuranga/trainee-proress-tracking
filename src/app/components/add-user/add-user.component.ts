import { UserExerciserReq } from './../../models/user-exerciser-req';
import { UserExercise } from './../../models/user-exercise';
import { Exercise } from './../../models/exercise';
import { UserExerciseService } from './../../_services/user-exercise.service';
import { ExerciceService } from './../../_services/exercice-service.';
import { User } from './../../models/user';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
// import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  user = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl(),
    password: new FormControl(),
    address: new FormControl(),
    phoneNo: new FormControl(),
    role: new FormControl(),
    trainee: new FormControl(),
    trainer: new FormControl(),
  });
  exerciseList!: Exercise[];
  showAlert = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private exerciseService: ExerciceService,
    private userExerciseService: UserExerciseService
  ) {}
  ngOnInit(): void {}

  saveUser() {
    console.log(this.user.value);
    const userObject = new User();
    (userObject.username = this.user.value.username),
      (userObject.email = this.user.value.email);
    userObject.password = this.user.value.password;
    (userObject.phoneNo = this.user.value.phoneNo),
      (userObject.address = this.user.value.address),
      (userObject.roles = [this.user.value.role]);
    this.userService.createUser(userObject).subscribe((response: any) => {
      console.log(response);
      this.showAlert = true;
      const createdUser = response;
      if (this.user.value.role === 'trainee') {
        this.exerciseService.getAllExercises().subscribe((response2: any) => {
          this.exerciseList = response2;

          let userExercise = new UserExerciserReq();

          userExercise.Assined_Date = null;
          userExercise.Completed_Date = null;
          userExercise.comment = '';
          userExercise.status = 'Not Started';
          userExercise.traineeId = createdUser.id;
          this.exerciseList.forEach((exercise) => {
            userExercise.exercise = exercise.id;
            this.userExerciseService
              .addUserExercise(userExercise)
              .subscribe((reponse3: any) => {
                console.log(reponse3);
              });
          });
        });
      }
    });
  }

  closeAlert() {
    this.showAlert = false;
  }
}
