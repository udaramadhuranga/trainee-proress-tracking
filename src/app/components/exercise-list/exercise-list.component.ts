import { Exercise } from './../../models/exercise';
import { ExerciceService } from './../../_services/exercice-service.';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
})
export class ExerciseListComponent implements OnInit {
  ExerciseList!: Exercise[];
  deletingExerciseId: string;
  @ViewChild('closebutton') closebutton;
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

  onClickDelete(id: string) {
    this.deletingExerciseId = id;
  }

  deleteExercise() {
    this.exerciseService
      .deleteExercise(this.deletingExerciseId)
      .subscribe((response) => {});
    alert('deleted Successfully');
    window.location.reload();
  }

  onclickUpdate(exercise) {
    this.router.navigate(['/update-exercise'], {
      queryParams: { data: JSON.stringify(exercise) },
    });
  }
}
