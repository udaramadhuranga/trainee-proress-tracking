import { User } from './../../models/user';
import { UserService } from './../../_services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  @Input() user1: User;

  role1: ['trainer'];
  role2: ['trainee'];
  showAlert = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    console.log(this.user1);
  }

  saveUser() {
    const userObject = new User();
    (userObject.username = this.user1.username),
      (userObject.email = this.user1.email);
    userObject.password = this.user1.password;
    (userObject.phoneNo = this.user1.phoneNo),
      (userObject.address = this.user1.address),
      (userObject.roles = ['trainer']);
    this.userService
      .updateUser(userObject, this.user1.id)
      .subscribe((response) => {
        console.log(response);
        this.showAlert = true;
      });
  }
}
