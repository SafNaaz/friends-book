import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateOfBirthValidator } from 'src/app/helpers/validators/dob-validator/dob.validator';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  submitted: boolean = false;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    if (this.userService.currentUserValue?.token) {
      this.router.navigate(['/social/posts']);
    }
  }

  ngOnInit(): void {}

  get f() {
    return this.forgotPasswordForm.controls;
  }

  forgotPasswordForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
    },
    {
      validators: [
        DateOfBirthValidator.validDob,
      ],
    }
  );

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.forgotPasswordForm.invalid) {
      this.loading = false;
      return;
    }

    let user = {
      email: this.forgotPasswordForm.get('email')?.value,
      dob: this.forgotPasswordForm.get('dob')?.value,
    };

    this.userService.forgotPassword(user).subscribe((data : User[]) =>{
        if(data.length == 1){
          if(new Date(user.dob).toDateString() === new Date(data[0].dob).toDateString()){
            this.loading = false;
            this.router.navigate(['reset-password'],{ state: { id: data[0].id }});
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
