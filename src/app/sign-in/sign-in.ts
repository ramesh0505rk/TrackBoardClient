import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn implements OnInit {
  signInForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: Auth) { }

  ngOnInit() {
    this.intializeSignInForm();
  }

  intializeSignInForm() {
    this.signInForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[a-zA-Z][a-zA-Z0-9_.-]*$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }
}
