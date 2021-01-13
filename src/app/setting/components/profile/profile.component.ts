import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateOfBirthValidator } from 'src/app/helpers/validators/dob-validator/dob.validator';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user.service';
import { UserProfile } from '../../models/user-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User = new User;

  submitted: boolean = false;
  loading = false;
  error = '';
  updateSuccess = false;

  user!: UserProfile;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.currentUserValue;
    this.profileForm.patchValue({
      firstName : this.currentUser.firstName,
      lastName : this.currentUser.lastName,
      email : this.currentUser.email,
      dob : this.formatDate(this.currentUser.dob),
      gender : this.currentUser.gender,
      phone: this.currentUser.phone,
      city: this.currentUser.city,
      state: this.currentUser.state,
      country: this.currentUser.country,
      pincode: this.currentUser.pincode,
      profession: this.currentUser.profession,
    })
  }

  private formatDate(date : string) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  get f() {
    return this.profileForm.controls;
  }

  profileForm = this.fb.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.minLength(10)]],
      city: ['', [Validators.minLength(2)]],
      state: ['', [Validators.minLength(2)]],
      country: ['', [Validators.minLength(2)]],
      pincode: ['', [Validators.minLength(6)]],
      profession: ['', [Validators.minLength(2)]],
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
    if (this.profileForm.invalid) {
      this.loading = false;
      return;
    }

    this.user = new UserProfile(
      this.profileForm.get('firstName')?.value,
      this.profileForm.get('lastName')?.value,
      this.profileForm.get('email')?.value,
      this.profileForm.get('gender')?.value,
      this.profileForm.get('dob')?.value,
      this.profileForm.get('phone')?.value,
      this.profileForm.get('city')?.value,
      this.profileForm.get('state')?.value,
      this.profileForm.get('country')?.value,
      this.profileForm.get('pincode')?.value,
      this.profileForm.get('profession')?.value,
      this.currentUser._id
    );

    this.userService.updateUser(this.user).subscribe({
      next: () => {
        this.updateSuccess = true;
        this.loading = false;
        this.profileForm.reset();
        // this.router.navigate(['/login']);
      },
      error: (error : any) => {
        this.error = error;
        this.loading = false;
      },
    });
  }

  onLogout(){
    this.userService.logout()
    this.router.navigate(['/login']);
  }

  cancel(){
    this.router.navigate(['/social/posts']);
  }

}
