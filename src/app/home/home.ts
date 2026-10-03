import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from './side-bar/side-bar';
import { TopBar } from './top-bar/top-bar';
import { SideBarService } from './services/side-bar-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, TopBar, SideBar, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  isSideBarCollapsed = false;
  constructor(private sideBarService: SideBarService) { }

  ngOnInit(): void {
    this.sideBarService.isCollapsed$.subscribe(state => {
      this.isSideBarCollapsed = state;
    });
  }
}
