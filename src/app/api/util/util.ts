import {KeyValue} from '@angular/common';

export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function removeAccents(s = '') {
  let r = s.toLowerCase();
  r = r.replace(new RegExp('\\s', 'g'), '');
  r = r.replace(new RegExp('[àáâãäå]', 'g'), 'a');
  r = r.replace(new RegExp('æ', 'g'), 'ae');
  r = r.replace(new RegExp('ç', 'g'), 'c');
  r = r.replace(new RegExp('[èéêë]', 'g'), 'e');
  r = r.replace(new RegExp('[ìíîï]', 'g'), 'i');
  r = r.replace(new RegExp('ñ', 'g'), 'n');
  r = r.replace(new RegExp('[òóôõö]', 'g'), 'o');
  r = r.replace(new RegExp('œ', 'g'), 'oe');
  r = r.replace(new RegExp('[ùúûü]', 'g'), 'u');
  r = r.replace(new RegExp('[ýÿ]', 'g'), 'y');
  r = r.replace(new RegExp('\\W', 'g'), '');
  return r;
}

export function removeNotNumbers(s = '') {
  return s.toString().replace(/\D/g, ''); // Remove tudo o que não é dígito
}

export const sortFunction = (a: any, b: any): number => {
  if (a === null || typeof a === 'undefined') {
    a = 0;
  }
  if (b === null || typeof b === 'undefined') {
    b = 0;
  }
  if (a instanceof Date && b instanceof Date) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
  } else if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
    // Convert to string in case of a=0 or b=0
    a = String(a);
    b = String(b);
    // Isn't a number so lowercase the string to properly compare
    return a.toLowerCase().localeCompare(b.toLowerCase());
  } else {
    // Parse strings as numbers to compare properly
    if (parseFloat(a) < parseFloat(b)) {
      return -1;
    }
    if (parseFloat(a) > parseFloat(b)) {
      return 1;
    }
  }

  // equal each other
  return 0;
};

export const defaultSortFunction = (akv: KeyValue<string, any>, bkv: KeyValue<string, any>): number => {
  return 0;
};

