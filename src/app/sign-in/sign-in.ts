import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn implements OnInit {
  signInForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: Auth, private userService: UserService) { }

  ngOnInit() {
    this.intializeSignInForm();
  }

  intializeSignInForm() {
    this.signInForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[a-zA-Z][a-zA-Z0-9_.-]*$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  onSignUpClick() {
    this.router.navigate(['/signup']);
  }

  onSubmit() {
    this.isLoading = true;
    if (this.signInForm.invalid) {
      this.isLoading = false;
      this.signInForm.markAllAsTouched();
    }
  }
}
