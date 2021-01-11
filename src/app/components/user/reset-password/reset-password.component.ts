import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from 'src/app/helpers/validators/password-validator/password.validator';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  submitted: boolean = false;
  loading = false;
  error = '';

  resetPasswordSuccess: boolean = false;

  id : string = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.id = this.router.getCurrentNavigation()?.extras?.state?.id;
    if (this.userService.currentUserValue?.token) {
      this.router.navigate(['/social/posts']);
    }
  }

  ngOnInit(): void {}

  get f() {
    return this.resetPasswordForm.controls;
  }

  resetPasswordForm = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [
        ConfirmPasswordValidator.matchPassword,
      ],
    }
  );

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.resetPasswordForm.invalid) {
      this.loading = false;
      return;
    }

    let user = {
      id : this.id,
      password: this.resetPasswordForm.get('password')?.value
    };

    this.userService.resetPassword(user).subscribe({
      next: () => {
        this.resetPasswordSuccess = true;
        this.loading = false;
        this.resetPasswordForm.reset();
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      },
    })
  }

}
