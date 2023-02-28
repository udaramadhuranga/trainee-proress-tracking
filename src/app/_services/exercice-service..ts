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
}
