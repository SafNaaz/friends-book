import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  loading = false;
  error = '';

  constructor(private userService: UserService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get f() {
    return this.loginForm.controls;
  }

  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    }
  )

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    let user = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }

    console.log(user)
  }
    


}
