import { ValidatorFn, AbstractControl } from '@angular/forms';
// {invalidCedula: {value: control.value}}
export class ETutorValidator {
    static cedulaLengthValidator(nameRe: RegExp): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            let cedula = control.value;

            if (cedula == null || cedula == undefined || cedula == '') {
                return null;
            }

            if (!isValidCedula(cedula)) {
                return {invalidCedula: {value: control.value}};
            } else {
                return null;
            }
        };
    }
}


function isValidCedula(ced) {
    let c = ced.replace(/-/g,'');
    let Cedula = c.substr(0, c.length - 1);
    let Verificador = c.substr(c.length - 1, 1);
    let suma = 0;
    let mod: any;
    let res: any;
    let uno: any;
    let dos: any;
    let el_numero:any;
    if(ced.length < 13) { return false; }
    for (let i=0;i < Cedula.length;i++) {
        mod = "";
        if((i % 2) == 0){mod = 1} else {mod = 2}
        res = Cedula.substr(i,1) * mod;
        if (res > 9) {
            res = res.toString();
            uno = res.substr(0,1);
            dos = res.substr(1,1);
            res = eval(uno) + eval(dos);
        }
        suma += eval(res);
    }
    el_numero = (10 - (suma % 10)) % 10;
    if (el_numero == Verificador && Cedula.substr(0,3) != "000") {
        return true;
    }
    else   {
        return false;
    }
}
