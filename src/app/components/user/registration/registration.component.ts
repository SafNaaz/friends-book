import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateOfBirthValidator } from 'src/app/helpers/validators/dob-validator/dob.validator';
import { ConfirmPasswordValidator } from 'src/app/helpers/validators/password-validator/password.validator';
import { UserRegistration } from 'src/app/models/user/UserRegistration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  submitted: boolean = false;

  user! : UserRegistration;

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
  }

  get f(){
    return this.registrationForm.controls;
  }

  registrationForm = this.fb.group({
    firstName:['', [Validators.required, Validators.minLength(3)]],
    lastName:['', [Validators.required, Validators.minLength(3)]],
    email:['', [Validators.required, Validators.email]],
    dob:['', [Validators.required]],
    gender:['', [Validators.required]],
    password:['', [Validators.required, Validators.minLength(6)]],
    confirmPassword:['', [Validators.required, Validators.minLength(6)]],
    agreeTerms:['', Validators.required]
  },{validators : [ConfirmPasswordValidator.matchPassword,
                    DateOfBirthValidator.validDob]})

  onSubmit(){
    this.submitted = true;
    if(this.registrationForm.invalid){
      return;
    }

    this.user = new UserRegistration(this.registrationForm.get('firstName')?.value,
    this.registrationForm.get('lastName')?.value,
    this.registrationForm.get('email')?.value,
    this.registrationForm.get('gender')?.value,
    this.registrationForm.get('dob')?.value,
    this.registrationForm.get('password')?.value,
      
    )

    this.registrationForm.reset()
    
    console.log(this.user)
  }

}
