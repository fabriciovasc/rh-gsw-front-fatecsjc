export function formatPhoneToShow(pn) {
  if (pn) {
    pn = pn.toString();
    pn = pn.slice(0, pn.length - 4) + '-' + pn.slice(pn.length - 4);
    pn = pn.slice(0, 2) + ' ' + pn.slice(2);
    pn = pn.slice(0, 2) + ')' + pn.slice(2);
    pn = pn.slice(0, 0) + '(' + pn.slice(0);
  }
  return pn;
}

export function formatCnpjToShow(cnpj) {
  if (cnpj) {
    cnpj = cnpj.toString();
    cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/g, '\$1.\$2.\$3\/\$4\-');
  }
  return cnpj;
}

export function formatCurrencyToShow(value: string) {
  if (value) {
    value = value.toString().replace('.', ',');

    if (value.includes(',')) {
      if (value.length > 6) {
        value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
      }
    } else {
      value = value + ',00';

      if (value.length > 6) {
        value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
      }
    }

    return `R$ ${value}`;
  }

  return 'R$ 0,00';
}

export function formatCurrency(value = '') {
  try {
    let tmp = value + '';
    const isNegativeValue = tmp.indexOf('-') != -1;
    tmp = tmp.replace(/\D/g, '');
    tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
    if (tmp.length > 6) {
      tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
    }
    if (isNegativeValue && tmp) {
      tmp = '-' + tmp;
    }
    return tmp ? 'R$ ' + tmp : isNegativeValue ? 'R$ -' : '';
  } catch (e) {
    console.log(e);
    return 'R$ 0,00';
  }
}

export function formatPhone(phone) {
  if (phone) {
    phone = phone.toString();
    phone = phone.replace(/\D/g, '');                   // Remove tudo o que não é dígito
    phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2');  // Coloca parênteses em volta dos dois primeiros dígitos
    phone = phone.replace(/(\d)(\d{4})$/, '$1-$2');     // Coloca hífen entre o quarto e o quinto dígitos
  }
  return phone;
}

export function formatCnpj(cnpj) {
  if (cnpj) {
    cnpj = cnpj.toString();
    cnpj = cnpj.replace(/\D/g, '');                   // Remove tudo o que não é dígito
    cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/g, '\$1.\$2.\$3\/\$4\-');
  }
  return cnpj;
}

export function formatCep(cep) {
  if (cep) {
    cep = cep.toString();
    cep = cep.replace(/\D/g, ''); // Remove tudo o que não é dígito
    cep = cep.replace(/(\d)(\d{3})$/, '$1-$2'); // Coloca hífen separando os 2 grupos de dígitos
  }
  return cep;
}

export function formatCpf(cpf) {
  if (!cpf) {
    return '';
  }
  cpf = cpf.toString();
  cpf = cpf.replace(/\D/g, '');                   // Remove tudo o que não é dígito
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return cpf;
}
