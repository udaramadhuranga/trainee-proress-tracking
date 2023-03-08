import { UserExerciseService } from './../../_services/user-exercise.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import { ChartOptions, ChartType } from 'chart.js';
// import { Color, Label, SingleDataSet } from 'ng2-charts';

import { ChartConfiguration, Chart, registerables } from 'chart.js';
import { UserExercise } from 'src/app/models/user-exercise';
import { UserExerciserReq } from 'src/app/models/user-exerciser-req';

Chart.register(...registerables);

@Component({
  selector: 'app-trainee-progress-details',
  templateUrl: './trainee-progress-details.component.html',
  styleUrls: ['./trainee-progress-details.component.css'],
})
export class TraineeProgressDetailsComponent implements OnInit {
  userid: string;
  ExerciseList!: UserExercise[];
  comment: string;
  myChart: Chart;

  labeldata: any[] = ['Completed', 'inprogress', 'Not Completed'];
  realdata: any[] = [];
  colordata: any[] = ['blue', 'green', 'red'];

  constructor(
    private router: ActivatedRoute,
    private userExercise: UserExerciseService
  ) {}
  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      this.userid = params.data;
    });

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

  onClickSave(exercise: UserExercise) {
    const userExerciseReq = new UserExerciserReq();
    userExerciseReq.Assined_Date = exercise.Assined_Date;
    userExerciseReq.Completed_Date = exercise.Completed_Date;
    userExerciseReq.comment = exercise.comment;
    userExerciseReq.exercise = exercise.exercise.id;
    userExerciseReq.status = exercise.status;
    userExerciseReq.traineeId = exercise.traineeId.id;
    this.userExercise
      .updatTraineeExerciseByAdmin(userExerciseReq, exercise.id)
      .subscribe((response) => {
        alert('success');
        console.log(response);
        this.getAllExercises();
      });
  }

  onClickChangeState(exercise: UserExercise) {
    const userExerciseReq = new UserExerciserReq();
    userExerciseReq.Assined_Date = exercise.Assined_Date;
    userExerciseReq.Completed_Date = null;
    userExerciseReq.comment = exercise.comment;
    userExerciseReq.exercise = exercise.exercise.id;
    userExerciseReq.status = 'inProgress';
    userExerciseReq.traineeId = exercise.traineeId.id;

    this.userExercise
      .updatTraineeExerciseByAdmin(userExerciseReq, exercise.id)
      .subscribe((response) => {
        alert('success');
        this.myChart.destroy();
        this.getAllExerciseOfTrainee();
      });
  }
}
