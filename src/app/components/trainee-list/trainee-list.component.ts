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
  deletingUserid: any;

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList(): void {
    this.userService.getAllTrainees().subscribe((response: any) => {
      this.userList = response;
    });
  }

  deleteStudent() {
    this.userService
      .deleteTraineeByTrainer(this.deletingUserid)
      .subscribe((response) => {
        console.log(response);
      });
    alert('deleted Successfully');
    this.getStudentList();
  }
  onclickDelete(id: string) {
    this.deletingUserid = id;
  }
  onclickEdit(user: User) {
    this.editingUser = user;
  }

  onclickView(user) {
    this.router.navigate(['/trainee-progress'], {
      queryParams: { data: user.id },
    });
  }
}
