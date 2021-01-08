import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ConfirmPasswordValidator{

    static matchPassword(control: AbstractControl) : ValidationErrors | null{
        let password = control.get('password')?.value;
        let confirmPassword = control.get('confirmPassword')?.value;

        if(password != confirmPassword){
            control.get('confirmPassword')?.setErrors({passwordMismatch: true})
            return ({not_the_same: true});
        } else {
            return null
        }
    }
}