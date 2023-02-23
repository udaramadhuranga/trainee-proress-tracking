import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/_services/authservice.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthserviceService
  ) {}
  ngOnInit(): void {}

  public isLoogedIn() {
    return this.storageService.isLoggedIn();
  }

  public logout() {
    this.storageService.clear();
    this.router.navigate(['/home']);
  }

  public isMatched(allowedRoles): boolean {
    return this.authService.roleMatch(allowedRoles);
  }
}
