import { Exercise } from './../models/exercise';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExerciceService {
  PATH_OF_API = environment.apiBaseUrl + 'tasks';

  constructor(private httpclient: HttpClient) {}

  getAllExercises() {
    return this.httpclient.get(`${this.PATH_OF_API}/all`);
  }

  getExercise(id: string) {
    return this.httpclient.get(`${this.PATH_OF_API}/${id}`);
  }

  addExercise(exercise: Exercise) {
    return this.httpclient.post(`${this.PATH_OF_API}/`, exercise);
  }

  deleteExercise(id: string) {
    return this.httpclient.delete(`${this.PATH_OF_API}/${id}`);
  }

  updateExercise(exercise: Exercise, id: string) {
    return this.httpclient.put(`${this.PATH_OF_API}/${id}`, exercise);
  }
}
