import { ValidatorFn, AbstractControl } from '@angular/forms';

export class ETutorValidator {
    static cedulaLengthValidator(nameRe: RegExp): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            // console.log(control.value);
            // console.log(nameRe);
            const cedula = !nameRe.test(control.value);
            const digits = control.value.toString().split('-').join('').length;
            // console.log(digits);
            return (cedula || digits !== 11) ? {invalidCedula: {value: control.value}} : null;
        };
    }
}
