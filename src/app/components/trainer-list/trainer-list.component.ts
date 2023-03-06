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
  editingUser: any = {
    username: '',
    phoneNo: '',
    address: '',
    id: '',
    roles: [],
    password: '',
    email: '',
  };
  deletingUserid: any;
  deleteModel = document.getElementById('deleteModal');

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getTrainerList();
  }

  getTrainerList() {
    this.userService.getAllTrainers().subscribe((response: any) => {
      this.userList = response;
    });
  }

  deleteStudent() {
    this.userService.deleteUser(this.deletingUserid).subscribe((response) => {
      console.log(response);
    });
    alert('deleted Successfully');
    this.getTrainerList();
  }
  onclickDelete(id: string) {
    this.deletingUserid = id;
  }

  onclickEdit(user: User) {
    (this.editingUser.username = user.username),
      (this.editingUser.password = user.password),
      (this.editingUser.email = user.email),
      (this.editingUser.roles = user.roles),
      (this.editingUser.address = user.address),
      (this.editingUser.phoneNo = user.phoneNo),
      (this.editingUser.id = user.id);
    // this.editingUser = user;
  }
}
