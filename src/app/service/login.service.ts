import { LocalStorageService } from './local-storage-service.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccount, IToken, IUser } from '../interface/login.interface';
import { EnviromentComponent } from '../utils/enviroment.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private env: EnviromentComponent
  ) { }

  login(account: IAccount): Observable<IToken> {
    return this.http.post<IToken>(`${this.env.local}/api/v1/auth/authenticate`, account);
  }

  logout() {
    const headers = this.localStorageService.header();
    return this.http.get<any>(`${this.env.local}/api/v1/auth/logout`, { headers });
  }

  createUser(user: IUser): Observable<any> {
    const headers = this.localStorageService.header();
    return this.http.post<any>(`${this.env.local}/api/v1/private/users/create`, user, { headers });
  }
}
