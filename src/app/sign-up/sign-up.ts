import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: Auth) { }

  ngOnInit() {
    this.initializeSignUpForm();
  }

  initializeSignUpForm() {
    this.signUpForm = this.fb.group({
      userName: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      password: ['']
    });
  }

  onSubmit() {

  }

  onSignInClick() {
    this.router.navigate(['/signin']);
  }
}
