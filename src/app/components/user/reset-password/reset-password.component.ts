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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    // if (this.userService.currentUserValue?.token) {
    //   this.router.navigate(['/']);
    // }
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
      email: this.resetPasswordForm.get('email')?.value,
      dob: this.resetPasswordForm.get('dob')?.value,
    };

    this.userService.forgotPassword(user).subscribe((data : User[]) =>{
        if(data.length == 1){
          if(new Date(user.dob).toDateString() === new Date(data[0].dob).toDateString()){
            this.loading = false;
            this.router.navigateByUrl('reset-password');
          } else{
            this.loading = false;
            this.error = 'User Details does not match'
          }
        }else{
          this.loading = false;
          this.error = 'User Not found'
        }
    })
  }

}
