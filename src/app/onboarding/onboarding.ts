import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  imports: [],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
})
export class Onboarding {
  constructor(private router: Router) { }

  onRegister() {
    this.router.navigate(['/register'])
  }
  onJoin() {
    
  }
}
