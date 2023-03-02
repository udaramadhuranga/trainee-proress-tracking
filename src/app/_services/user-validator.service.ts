import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserValidatorService {
  emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
  phoneNoPattern =
    /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/;

  iValidationModel: any;
  constructor() {}

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  validateAllFormFields(formgroup: FormGroup | FormArray) {
    Object.keys(formgroup.controls).forEach((field) => {
      const control = formgroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.validateAllFormFields(control);
      }
    });
  }

  isEmailValid(form: FormGroup, field: string) {
    let isValid = false;
    if (form.get(field).touched) {
      const email = form.get(field).value;
      if (email !== null) {
        if (email.length <= 0) {
          isValid = false;
        } else if (this.emailRegEx.test(email)) {
          isValid = false;
        } else {
          isValid = true;
        }
      } else {
        return isValid;
      }
    }

    return isValid;
  }

  isPasswordValid(form: FormGroup, field: string) {
    let isValid = false;
    if (form.get(field).touched) {
      const password = form.get(field).value;
      if (password !== null) {
        if (password.length <= 0) {
          isValid = false;
        } else if (this.passwordRegEx.test(password)) {
          isValid = false;
        } else {
          isValid = true;
        }
      } else {
        return isValid;
      }
    }

    return isValid;
  }

  isPhoneValid(form: FormGroup, field: string) {
    let isValid = false;
    if (form.get(field).touched) {
      const phone = form.get(field).value;
      if (phone !== null) {
        if (phone.length <= 0) {
          isValid = false;
        } else if (this.phoneNoPattern.test(phone)) {
          isValid = false;
        } else {
          isValid = true;
        }
      } else {
        return isValid;
      }
    }
    return isValid;
  }

  isUsernameValid(form: FormGroup, field: string) {
    let isValid = false;
    if (form.get(field).touched) {
      const name = form.get(field).value;
      if (name !== null) {
        if (name.length <= 0) {
          isValid = false;
        } else {
          isValid = true;
        }
      } else {
        return isValid;
      }
    }
    return isValid;
  }

  isAddressValid(form: FormGroup, field: string) {
    let isValid = false;
    if (form.get(field).touched) {
      const address = form.get(field).value;
      if (address !== null) {
        if (address.length <= 0) {
          isValid = false;
        } else {
          isValid = true;
        }
      } else {
        return isValid;
      }
    }
    return isValid;
  }

  isCompare(form: FormGroup, confirmPwd: string, Pwd: string) {
    let isValid = false;
    const password = form.get(Pwd).value;
    const confirmPassword = form.get(confirmPwd).value;

    if (form.get(confirmPwd).touched && confirmPassword.length > 0) {
      if (password === confirmPassword) {
        isValid = false;
      } else {
        isValid = true;
      }
      return isValid;
    }
  }
}
