/*eslint no-useless-escape: 1 */

export const isFormValid = (form, validators) => {
   for(let v of validators) {
      for(let check of v.validator) {
         const keys = v.key.split('.');
         let value = form;
         for(let k of keys) {
            value = value[k];
         }
         let isValid = check(value);
         if(isValid.isError) return false;
      }
   }

   return true;
};

export const requiredValidator = (value) => {
   let isError = false;

   if(!value || value === '') {
      isError = true;
   }

   return {
      isError: isError,
      message: 'Please fill out this field',
   };
};

export const emailValidator = (value) => {
   const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

   return {
      isError:  !(reg.test(value)),
      message: 'Please fill out this field',
   };
};