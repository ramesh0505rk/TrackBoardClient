import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Register } from './register/register';

@Component({
  selector: 'app-onboarding',
  imports: [],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
})
export class Onboarding {
  constructor(private router: Router, private modalService: NgbModal) { }

  onRegister() {
    const modalRef = this.modalService.open(Register, {
      size:'lg',
    })
  }
  
  onJoin() {

  }
}
