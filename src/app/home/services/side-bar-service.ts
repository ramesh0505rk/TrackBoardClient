import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  private _isCollapsed = new BehaviorSubject<boolean>(false);
  isCollapsed$ = this._isCollapsed.asObservable();

  setCollapsed(state: boolean) {
    this._isCollapsed.next(state);
  }
}
