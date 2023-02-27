import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-trainee-list',
  templateUrl: './trainee-list.component.html',
  styleUrls: ['./trainee-list.component.css'],
})
export class TraineeListComponent {
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
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList(): void {
    this.userService.getAllTrainees().subscribe((response: any) => {
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

  onclickView(user) {
    this.router.navigate(['/trainee-progress'], {
      queryParams: { data: user.id },
    });
  }
}
