import { Component, OnInit } from '@angular/core';
import { SideBarService } from '../services/side-bar-service';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar implements OnInit {
  isSideBarCollapsed = false;
  constructor(private sideBarService: SideBarService) { }

  ngOnInit(): void {

  }

  onCollapseSideBar() {
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
    this.sideBarService.setCollapsed(this.isSideBarCollapsed);
  }
}
