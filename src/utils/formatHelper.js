export const currencyFormat = (value) => {
    return `$ ${value/100}`;
};

export const centToDollars = (value) => {
    return value/100;
};

export const cardNumberHideFormat = (number) => {
    return `X-${number.substr(number.length - 4)}`;
};

export const upperFirst = (value) => {
    if (value.length >= 1) {
        return value[0].toUpperCase() + value.substring(1);
    }
    return value;
};

export const numberFormatter= value => value.toString().replace(/\D/g,'');

export const formatMany = (count, text) => {
    if(count > 1) {
      return `${text}s`;
    }

    return text;
};
