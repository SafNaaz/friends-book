import { AbstractControl, ValidationErrors } from '@angular/forms';

export class DateOfBirthValidator {
  static validDob(control: AbstractControl): ValidationErrors | null {
    let inputDob = control.get('dob')?.value;

    let validDate = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.test(inputDob);


    if (!validDate) {
      control.get('dob')?.setErrors({ invalidDate: true });
    } else {

        let dateofBirth = new Date(inputDob);

        let now = new Date()

        if(now < dateofBirth){
            control.get('dob')?.setErrors({ futureDate: true });
        }

        // if(dateofBirth.getTime() > )
    //   let dobisValid = true;

    //   if (dob.get){

    //   }

    //   if (!dobisValid) {
    //     control.get('dob')?.setErrors({ passwordMismatch: true });
    //     return { not_the_same: true };
    //   }
    // } else {
        return null;
      }
  }
}
