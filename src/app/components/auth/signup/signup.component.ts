import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  registerForm!: FormGroup;
  submitted = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [null, Validators.required],
        occupation: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
        subscribeToNews: [false],
      },
      {
        validator: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const signupData = { ...this.registerForm.value };
    delete signupData.confirmPassword;
    this.authService.signup(signupData).subscribe({
      next: (response) => {
        if (response) {
          this.router.navigate(['auth', 'login']);
          this.toaster.success(
            'Account created successfully. Login to access your account.'
          );
        } else {
          this.toaster.error('An unknown error occured.');
        }
      },
      error: (error) => {},
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
