import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { UserService } from '../services/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp implements OnInit {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: Auth, private userService: UserService) { }

  ngOnInit() {
    this.initializeSignUpForm();
  }

  initializeSignUpForm() {
    this.signUpForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('^[a-zA-Z][a-zA-Z0-9_.-]*$')]],
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { userName, firstName, lastName, email, password } = this.signUpForm.value;
    this.userService.getTokenBySignUp(userName, firstName, lastName, email, password).subscribe({
      next: (res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
        this.authService.checkAuthStatus();
        this.router.navigate(['/home']);
      },
      error: (err: any) => {

      }
    })
  }

  onSignInClick() {
    this.router.navigate(['/signin']);
  }
}
