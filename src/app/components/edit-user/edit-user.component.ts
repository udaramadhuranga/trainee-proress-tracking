import { User } from './../../models/user';
import { UserService } from './../../_services/user.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AuthserviceService } from 'src/app/_services/authservice.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit, OnChanges {
  @Input() user1: User;
  user: any;
  role1: any = ['ROLE_TRAINER'];
  role2: any = ['ROLE_TRAINEE'];
  showAlert = false;

  constructor(
    private userService: UserService,
    public authService: AuthserviceService
  ) {}
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.user = this.user1;
  }

  saveUser() {
    console.log(this.user1.roles[0].name);
    if (this.authService.roleMatch(['ROLE_ADMIN'])) {
      this.updateUsserByAdmin();
    } else {
      this.updateUserByTrainer();
    }
  }

  updateUsserByAdmin() {
    const userObject = new User();
    if (this.user1.roles[0].name == 'ROLE_TRAINER') {
      userObject.roles = ['trainer'];
    } else {
      userObject.roles = ['trainee'];
    }
    (userObject.username = this.user1.username),
      (userObject.email = this.user1.email);
    userObject.password = this.user1.password;
    (userObject.phoneNo = this.user1.phoneNo),
      (userObject.address = this.user1.address),
      this.userService
        .updateUser(userObject, this.user1.id)
        .subscribe((response) => {
          this.showAlert = true;
        });
  }

  updateUserByTrainer() {
    const userObject = new User();
    (userObject.username = this.user1.username),
      (userObject.email = this.user1.email);
    userObject.password = this.user1.password;
    (userObject.phoneNo = this.user1.phoneNo),
      (userObject.address = this.user1.address),
      (userObject.roles = ['trainee']);
    this.userService
      .updateTraineeByTrainer(userObject, this.user1.id)
      .subscribe((response) => {
        this.showAlert = true;
      });
  }
}
