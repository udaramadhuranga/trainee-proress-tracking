import { User } from './../../models/user';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  user = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    address: new FormControl(),
    phoneNo: new FormControl(),
    role: new FormControl(),
    trainee: new FormControl(),
    trainer: new FormControl(),
  });
  showAlert = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  ngOnInit(): void {}

  saveUser() {
    const userObject = new User();
    (userObject.username = this.user.value.username),
      (userObject.email = this.user.value.email);
    userObject.password = this.user.value.password;
    (userObject.phoneNo = this.user.value.phoneNo),
      (userObject.address = this.user.value.address),
      (userObject.roles = ['trainer']);
    this.userService.createUser(userObject).subscribe((response) => {
      console.log(response);
      this.showAlert = true;
    });
  }

  closeAlert() {
    this.showAlert = false;
  }
}
