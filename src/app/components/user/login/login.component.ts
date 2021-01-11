import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  returnUrl: string = ''

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if (this.userService.currentUserValue?.token) {
      this.router.navigate(['/social/posts']);
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/social/posts';
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

    this.userService.login(user).subscribe({
      next: (data) => {
        console.log(data)
        this.loading = false;
        this.loginForm.reset();
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      },
    });

  }
    


}
