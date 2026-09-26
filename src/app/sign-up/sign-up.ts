import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { UserService } from '../services/user-service';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter, Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp implements OnInit, OnDestroy {
  signUpForm!: FormGroup;
  isCheckingUserName = signal(false);
  userNameTaken = signal(false);
  private userNameSub?: Subscription;

  constructor(private fb: FormBuilder, private router: Router, private authService: Auth, private userService: UserService) { }

  ngOnInit() {
    this.initializeSignUpForm();
    this.listenToUserNameChanges();
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

  listenToUserNameChanges() {
    this.userNameSub = this.signUpForm.get('userName')!.valueChanges.pipe(
      tap(val => this.isCheckingUserName.set(val?.length >= 3)),
      debounceTime(400),
      distinctUntilChanged(),
      tap(val => this.userNameTaken.set(false)),
      filter(val => val && val.length >= 3),
      switchMap(val => this.userService.userNameExists(val))
    ).subscribe({
      next: (res: any) => {
        this.isCheckingUserName.set(false);
        this.userNameTaken.set(!!res);
      },
      error: () => this.isCheckingUserName.set(false)
    })
  }

  hasError(controlName: string): boolean {
    const control = this.signUpForm.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
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

  ngOnDestroy(): void {
    this.userNameSub?.unsubscribe();
  }
}
