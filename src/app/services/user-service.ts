import { Injectable } from '@angular/core';
import { env } from '../environments/env';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  restApiurl: string = env.restApiUrl;

  constructor(private readonly http: HttpClient) { }

  getTokenBySignIn(userName: string, password: string) {
    var request = { userName, password };

    return this.http.post(`${this.restApiurl}/User/SignIn`, request)
      .pipe(
        catchError(err => {
          return throwError(() => err)
        })
      )
  }

  getTokenBySignUp(userName: string, firstName: string, lastName: string, email: string, password: string) {
    var request = { userName, firstName, lastName, email, password };

    return this.http.post(`${this.restApiurl}/User/SignUp`, request)
      .pipe(
        catchError(err => {
          return throwError(() => err)
        })
      )
  }
}
