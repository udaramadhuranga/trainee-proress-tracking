import { UserValidatorService } from './../../_services/user-validator.service';
import { UserExerciserReq } from './../../models/user-exerciser-req';
import { Exercise } from './../../models/exercise';
import { UserExerciseService } from './../../_services/user-exercise.service';
import { ExerciceService } from './../../_services/exercice-service.';
import { User } from './../../models/user';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  user = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(10),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(10),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    role: new FormControl(),
  });
  exerciseList!: Exercise[];
  showAlert = false;
  constructor(
    private userService: UserService,
    private exerciseService: ExerciceService,
    private userExerciseService: UserExerciseService,
    public customeValidationService: UserValidatorService,
    public authService: AuthserviceService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  saveUser() {
    if (this.authService.roleMatch(['ROLE_ADMIN'])) {
      this.addUserByAdmin();
    } else {
      this.addUserByTrainer();
    }
  }

  closeAlert() {
    this.showAlert = false;
  }

  addUserByAdmin() {
    if (this.user.valid) {
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

                  this.router.navigate(['/trainee-list']);
                });
            });
          });
        } else {
          this.router.navigate(['/trainer-list']);
        }
      });
    } else {
      this.customeValidationService.validateAllFormFields(this.user);
    }
  }

  addUserByTrainer() {
    if (this.user.valid) {
      console.log(this.user.value);
      const userObject = new User();
      (userObject.username = this.user.value.username),
        (userObject.email = this.user.value.email);
      userObject.password = this.user.value.password;
      (userObject.phoneNo = this.user.value.phoneNo),
        (userObject.address = this.user.value.address),
        (userObject.roles = ['trainee']);
      this.userService
        .createUserByTrainer(userObject)
        .subscribe((response: any) => {
          console.log(response);
          this.showAlert = true;
          const createdUser = response;
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
                  this.router.navigate(['/trainee-list']);
                });
            });
          });
        });
    } else {
      this.customeValidationService.validateAllFormFields(this.user);
    }
  }
}
