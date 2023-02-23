import { User } from './../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:3005/api/user';

  constructor(private httpclient: HttpClient) {}

  createUser(user: User) {
    return this.httpclient.post(this.PATH_OF_API + '/by-admin', user);
  }

  updateUser(user: User, id: string) {
    return this.httpclient.put(`${this.PATH_OF_API}/${id}`, user);
  }

  getAllTrainers() {
    return this.httpclient.get(this.PATH_OF_API + '/trainers');
  }

  getAllTrainees() {
    return this.httpclient.get(this.PATH_OF_API + '/trainees');
  }

  deleteUser(id: string) {
    return this.httpclient.delete(`${this.PATH_OF_API}/${id}`);
  }
}
