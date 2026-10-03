import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgClass } from '../../../../node_modules/@angular/common/types/_common_module-chunk';
import { Subscription } from 'rxjs';
import { SideBarService } from '../services/side-bar-service';

@Component({
  selector: 'app-side-bar',
  imports: [NgClass],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBar implements OnInit, OnDestroy {
  isSideBarCollapsed = false;
  private sideBarSubscription!: Subscription;

  constructor(private sideBarService: SideBarService) { }

  ngOnInit(): void {
    this.sideBarSubscription = this.sideBarService.isCollapsed$.subscribe(state => {
      this.isSideBarCollapsed = state;
    })
  }

  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe();
  }
}
