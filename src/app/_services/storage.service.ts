import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles() {
    return JSON.parse(localStorage.getItem('roles'));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  public setId(id: string) {
    localStorage.setItem('id', id);
  }

  public getId(): string {
    return localStorage.getItem('id');
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public clear() {
    localStorage.clear();
  }
}
