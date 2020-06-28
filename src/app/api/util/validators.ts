import {ValidatorFn} from '@angular/forms';

export const isValidCpf = (cpf) => {
  {
    cpf = cpf.toString();
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') {
      return false;
    }
    // Elimina CPFs invalidos conhecidos
    if (cpf.length !== 11 ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999') {
      return false;
    }
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i), 10) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(9), 10)) {
      return false;
    }
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i), 10) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(10), 10)) {
      return false;
    }
    return true;
  }
};

export function cpfValidator(c) {
  return c.value && isValidCpf(c.value) ? null : {validCpf: {valid: false}};
}

export const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email && re.test(email);
};

export function emailValidator(c) {
  const falseObj = {
    emailValidator: {
      valid: false
    }
  };

  const email = c.value;

  if (isValidEmail(email)) {
    return null;
  }

  return falseObj;
}

export function couponCodeValidator(code) {
  const letters = code.value.toString().toUpperCase().replace(/[^A-Z]/g, '');
  const numbers = code.value.toString().toUpperCase().replace(/[^\d]/g, '');
  if (!code || (letters.length > 6 && numbers.length > 1)) {
    return null;
  } else {
    const falseObj = {
      couponCodeValidator: {
        valid: false
      }
    };
    return falseObj;
  }

}

export function dateValidator(date) {
  // const pattern = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  const pattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!date || !date.value || date.value.match(pattern)) {
    return null;
  } else {
    return {
      date: {
        valid: false
      }
    };
  }
}

export interface BooleanFn {
  (): boolean;
}

/**
 * A conditional validator generator. Assigns a validator to the form control if the predicate function returns true on the moment of validation
 * @example
 * Here if the myCheckbox is set to true, the myEmailField will be required and also the text will have to have the word 'mason' in the end.
 * If it doesn't satisfy these requirements, the errors will placed to the dedicated `illuminatiError` namespace.
 * Also the myEmailField will always have `maxLength`, `minLength` and `pattern` validators.
 * ngOnInit() {
 *   this.myForm = this.fb.group({
 *    myCheckbox: [''],
 *    myEmailField: ['', [
 *       Validators.maxLength(250),
 *       Validators.minLength(5),
 *       Validators.pattern(/.+@.+\..+/),
 *       conditionalValidator(() => this.myForm.get('myCheckbox').value,
 *                            Validators.compose([
 *                            Validators.required,
 *                            Validators.pattern(/.*mason/)
 *         ]),
 *        'illuminatiError')
 *        ]]
 *     })
 * }
 * @param predicate
 * @param validator
 * @param errorNamespace optional argument that creates own namespace for the validation error
 */
export function conditionalValidator(predicate: BooleanFn,
                                     validator: ValidatorFn,
                                     errorNamespace?: string): ValidatorFn {
  return (formControl => {
    if (!formControl.parent) {
      return null;
    }
    let error = null;
    if (predicate()) {
      error = validator(formControl);
    }
    if (errorNamespace && error) {
      const customError = {};
      customError[errorNamespace] = error;
      error = customError;
    }
    return error;
  });
}
