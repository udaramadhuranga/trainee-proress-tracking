import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/_services/authservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private authService: AuthserviceService) {}
  ngOnInit(): void {}

  public isMatched(allowedRoles): boolean {
    return this.authService.roleMatch(allowedRoles);
  }
}
