import { Exercise } from './../models/exercise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExerciceService {
  PATH_OF_API = 'http://localhost:3005/api/tasks';

  constructor(private httpclient: HttpClient) {}

  getAllExercises() {
    return this.httpclient.get(`${this.PATH_OF_API}/all`);
  }

  addExercise(Exercise: Exercise) {
    return this.httpclient.post(`${this.PATH_OF_API}/`, Exercise);
  }

  deleteExercise(id: string) {
    return this.httpclient.delete(`${this.PATH_OF_API}/${id}`);
  }
}
