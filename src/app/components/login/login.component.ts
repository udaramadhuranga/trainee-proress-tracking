import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthserviceService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(loginForm) {
    this.authService.login(loginForm.value).subscribe(
      (response) => {
        console.log(response.roles);
        this.storageService.setRoles(response.roles);
        this.storageService.setToken(response.token);
        this.storageService.setId(response.id);

        const role = response.roles[0];
        if (role == 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role == 'ROLE_TRAINER') {
          this.router.navigate(['/trainer']);
        } else {
          this.router.navigate(['/trainee']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
