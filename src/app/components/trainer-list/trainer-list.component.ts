import { UserService } from './../../_services/user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.css'],
})
export class TrainerListComponent implements OnInit {
  userList!: User[];
  editingUser = {
    username: '',
    phoneNo: '',
    address: '',
    id: '',
    roles: [],
    password: '',
    email: '',
  };
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getAllTrainers().subscribe((response: any) => {
      this.userList = response;
    });
  }

  deleteStudent(id) {
    this.userService.deleteUser(id).subscribe((response) => {
      console.log(response);
    });
  }

  onclickEdit(user: User) {
    // (this.editingUser.username = user.username),
    //   (this.editingUser.password = user.password),
    //   (this.editingUser.email = user.email),
    //   (this.editingUser.roles = user.roles),
    //   (this.editingUser.address = user.address),
    //   (this.editingUser.phoneNo = user.phoneNo),
    //   (this.editingUser.id = user.id);
    this.editingUser = user;
  }
}
