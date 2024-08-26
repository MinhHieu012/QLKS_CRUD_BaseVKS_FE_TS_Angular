import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserAdd } from '../interface/user.interface';
import { LocalStorageService } from './local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('')
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public getAllUsers(): Observable<User> {
    return this.http.get<User>("http://localhost:8080/admin/quanlyuser");
  }

  public addUser(dataAddUser: UserAdd) {
    const headers = this.localStorageService.header();
    return this.http.post<User>('http://localhost:8080/admin/quanlyuser/add', dataAddUser, {headers});
  }
}
