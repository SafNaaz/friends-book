import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator{

    static matchPassword(control: AbstractControl){
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
        }

        if(password != confirmPassword){
            control.get('confirmPassword')?.setErrors({passwordMismatch: true})
        }
    }
}