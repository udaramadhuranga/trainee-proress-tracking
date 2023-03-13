import { UserExerciseService } from './../../_services/user-exercise.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ChartConfiguration, Chart, registerables } from 'chart.js';
import { UserExercise } from 'src/app/models/user-exercise';
import { UserExerciserReq } from 'src/app/models/user-exerciser-req';
import { StorageService } from 'src/app/_services/storage.service';
import { DatePipe } from '@angular/common';

Chart.register(...registerables);
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  userid: string;
  ExerciseList!: UserExercise[];
  comment: string;
  myChart: Chart;
  myDate = new Date();

  labeldata: any[] = ['Completed', 'inprogress', 'Not Completed'];
  realdata: any[] = [];
  colordata: any[] = ['blue', 'green', 'red'];

  constructor(
    private router: ActivatedRoute,
    private userExercise: UserExerciseService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.userid = this.storageService.getId();
    console.log(this.userid);
    this.getAllExerciseOfTrainee();
  }

  getAllExercises() {
    this.userExercise.getAllTrainers(this.userid).subscribe((response: any) => {
      this.ExerciseList = response;
    });
  }

  getAllExerciseOfTrainee() {
    this.userExercise.getAllTrainers(this.userid).subscribe((response: any) => {
      this.ExerciseList = response;

      console.log(this.ExerciseList);
      if (this.ExerciseList != null) {
        let completedCount = 0;
        let inProgressCount = 0;
        let NotStartedCount = 0;

        for (let i = 0; i < response.length; i++) {
          console.log(this.ExerciseList[i].status);
          if (this.ExerciseList[i].status == 'Completed') {
            completedCount = completedCount + 1;
          } else if (this.ExerciseList[i].status == 'inProgress') {
            inProgressCount = inProgressCount + 1;
          } else {
            NotStartedCount = NotStartedCount + 1;
          }
        }
        this.realdata.push(completedCount);
        this.realdata.push(inProgressCount);
        this.realdata.push(NotStartedCount);
      }

      this.RenderChart(
        this.labeldata,
        this.realdata,
        this.colordata,
        'bar',
        'barchart'
      );

      this.RenderChart(
        this.labeldata,
        this.realdata,
        this.colordata,
        'doughnut',
        'dochart'
      );
    });
  }

  RenderChart(
    labledata: any,
    maindata: any,
    colordata: any,
    type: any,
    id: any
  ) {
    this.myChart = new Chart(id, {
      type: type,
      data: {
        labels: labledata,
        datasets: [
          {
            label: 'Tasks Count',
            data: maindata,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        backgroundColor: colordata,
      },
    });
  }

  onClickStart(exercise: UserExercise) {
    const userExerciseReq = new UserExerciserReq();
    userExerciseReq.Assined_Date = null;
    userExerciseReq.Completed_Date = null;
    userExerciseReq.exercise = exercise.exercise.id;
    userExerciseReq.status = 'Not Started';
    userExerciseReq.traineeId = exercise.traineeId.id;
    this.userExercise
      .updatTraineeExerciseByTrainee(userExerciseReq, exercise.id)
      .subscribe((response) => {
        alert('success');
        this.myChart.destroy();
        this.getAllExerciseOfTrainee();
      });
    window.location.reload();
  }

  onClickInprogress(exercise: UserExercise) {
    const userExerciseReq = new UserExerciserReq();

    userExerciseReq.Assined_Date = this.myDate;
    userExerciseReq.Completed_Date = null;

    userExerciseReq.exercise = exercise.exercise.id;
    userExerciseReq.status = 'inProgress';
    userExerciseReq.traineeId = exercise.traineeId.id;

    this.userExercise
      .updatTraineeExerciseByTrainee(userExerciseReq, exercise.id)
      .subscribe((response) => {
        alert('success');
        this.myChart.destroy();
        this.getAllExerciseOfTrainee();
      });
    window.location.reload();
  }

  onClickComplete(exercise: UserExercise) {
    const userExerciseReq = new UserExerciserReq();

    userExerciseReq.Assined_Date = exercise.Assined_Date;
    userExerciseReq.Completed_Date = this.myDate;

    userExerciseReq.exercise = exercise.exercise.id;
    userExerciseReq.status = 'Completed';
    userExerciseReq.traineeId = exercise.traineeId.id;

    this.userExercise
      .updatTraineeExerciseByTrainee(userExerciseReq, exercise.id)
      .subscribe((response) => {
        alert('success');
        this.myChart.destroy();
        this.getAllExerciseOfTrainee();
      });
    window.location.reload();
  }
}
