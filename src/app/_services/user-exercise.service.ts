import { UserExercise } from './../models/user-exercise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserExerciserReq } from '../models/user-exerciser-req';

@Injectable({
  providedIn: 'root',
})
export class UserExerciseService {
  PATH_OF_API = 'http://localhost:3005/api/user-exercise';

  constructor(private httpclient: HttpClient) {}

  getAllTrainers(id) {
    return this.httpclient.get(`${this.PATH_OF_API}/trainee-all-courses/${id}`);
  }

  updatTraineeExerciseByAdmin(user: UserExerciserReq, id: string) {
    return this.httpclient.put(`${this.PATH_OF_API}/${id}`, user);
  }

  updatTraineeExerciseByTrainee(user: UserExerciserReq, id: string) {
    return this.httpclient.put(`${this.PATH_OF_API}/state/${id}`, user);
  }
}