import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateOfBirthValidator } from 'src/app/helpers/validators/dob-validator/dob.validator';
import { ConfirmPasswordValidator } from 'src/app/helpers/validators/password-validator/password.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  submitted: boolean = false;

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
    phoneNumber:['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]*$')]],
    password:['', [Validators.required, Validators.minLength(6)]],
    confirmPassword:['', [Validators.required, Validators.minLength(6)]]
  },{validators : [ConfirmPasswordValidator.matchPassword,
                    DateOfBirthValidator.validDob]})

  onSubmit(){

  }

}
