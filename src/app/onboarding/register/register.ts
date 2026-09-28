import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {

  registerForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeRegisterForm();
    document.querySelectorAll<HTMLElement>('app-register').forEach(ele => {
      if (ele.parentElement) {
        ele.parentElement.style.borderRadius = '15px';
        ele.parentElement.style.backgroundColor = 'transparent';
      }
    });
  }

  initializeRegisterForm() {
    this.registerForm = this.fb.group({
      orgName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)]]
    })
  }

  hasError(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {

  }
}
