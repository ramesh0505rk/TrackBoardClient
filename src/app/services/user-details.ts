import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  userDetails: UserDetail | null = null;
  setUserDetails(details: UserDetail | null) {
    this.userDetails = details;
  }
}

export interface UserDetail {
  UserId: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Role: string;
  OrgId: string;
}