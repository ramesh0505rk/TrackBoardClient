import { Injectable } from '@angular/core';
import { env } from '../environments/env';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  restApiUrl: string = env.restApiUrl;

  constructor(private readonly http: HttpClient) { }

  registerOrganization(orgName: string, userId: string) {
    var request = { orgName, userId };

    return this.http.post(`${this.restApiUrl}/Organization/Register`, request)
      .pipe(
        catchError(err => {
          return throwError(() => err)
        })
      );
  }
}
