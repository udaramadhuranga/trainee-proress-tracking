import { Exercise } from './../../models/exercise';
import { ExerciceService } from './../../_services/exercice-service.';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
})
export class ExerciseListComponent implements OnInit {
  ExerciseList!: Exercise[];
  constructor(
    private exerciseService: ExerciceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllExercises();
  }

  getAllExercises() {
    this.exerciseService.getAllExercises().subscribe((response: any) => {
      console.log(response);
      this.ExerciseList = response;
    });
  }

  onClickDelete(id) {
    this.exerciseService.deleteExercise(id).subscribe((response) => {
      console.log(response);
      this.getAllExercises();
    });
  }

  onclickUpdate(exercise) {
    this.router.navigate(['/update-exercise'], {
      queryParams: { data: JSON.stringify(exercise) },
    });
  }
}
