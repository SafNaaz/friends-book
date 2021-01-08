import { AbstractControl } from '@angular/forms';

export class DateOfBirthValidator {
  static validDob(control: AbstractControl) {
    let inputDob = control.get('dob')?.value;

    if(control.get('dob')?.invalid){
      return
  }

    let validDate = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.test(inputDob);


    if (!validDate) {
      control.get('dob')?.setErrors({ invalidDate: true });
    } else {

        let dateofBirth = new Date(inputDob);

        let now = new Date()

        if(now < dateofBirth){
            control.get('dob')?.setErrors({ futureDate: true });
            return;
        }

        if(DateOfBirthValidator.getAge(dateofBirth) < 15){
          control.get('dob')?.setErrors({ minor: true });
          return;
        }

      }
  }

  static getAge(birthDate :Date) : number {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
}
