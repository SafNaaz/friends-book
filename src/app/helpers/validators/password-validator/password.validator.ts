import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ConfirmPasswordValidator{

    static matchPassword(control: AbstractControl) : ValidationErrors | null{
        let password = control.get('password')?.value;
        let confirmPassword = control.get('confirmPassword')?.value;

        let hasNumber = /\d/.test(password);
        let hasUpper = /[A-Z]/.test(password);
        let hasLower = /[a-z]/.test(password);
        let hasSpecial = /(?=.*[$@!%*?&])/.test(password);
        // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
        const valid = hasNumber && hasUpper && hasLower && hasSpecial;
        if (!valid) {
            // return what´s not valid
            control.get('password')?.setErrors({passwordWeak: true})
            return { strong: true };
        }

        if(password != confirmPassword){
            control.get('confirmPassword')?.setErrors({passwordMismatch: true})
            return ({not_the_same: true});
        } else {
            return null
        }
    }
}