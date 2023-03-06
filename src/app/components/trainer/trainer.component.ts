import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/_services/authservice.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
})
export class TrainerComponent implements OnInit {
  constructor(private authService: AuthserviceService) {}
  ngOnInit(): void {}

  public isMatched(allowedRoles): boolean {
    return this.authService.roleMatch(allowedRoles);
  }
}
