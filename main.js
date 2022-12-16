import {el, setChildren} from 'redom';

const regexNumberCard = /^1|^8|^9|^0/;

const createCard = () => {

    const wrapper = el('div', {className: 'wrapper'});
    const card = el('div', {className: 'card'}, el('p', {className: 'secure'}, 'Secure Checkout') );

    const numberCardSpan  = el('span', {className: 'card__number'}, 'xxxx xxxx xxxx xxxx');
    const nameCardSpan  = el('span', {className: 'card__name'}, 'John Doe');
    const dateCardSpan  = el('span', {className: 'card__date'}, '04/24');
    const nameDataWrapper = el('div', {className: 'card__personal'}, [nameCardSpan, dateCardSpan])
    const frontCard = el('div', {className: 'credit-card'}, [numberCardSpan, nameDataWrapper]);//шапка карты с импутами вываода данных о владельце
    

    const nameCardInput =  el('div', {className: 'form__input-wrap form__input-wrap_holder'}, [el('label',{className: 'form__label form__holder-label'}, 'Card Holder'),
     el('input',{className: 'input input__holder',
     oninput(event) {
        nameCardSpan.textContent = event.target.value;
      },})
    ]);
    const numberCardInput =  el('div', {className: 'form__input-wrap form__input-wrap_number'}, [el('label',{className: 'form__label form__number-label'}, 'Card Number'),
    el('input',{className: 'input input__number', id: 'cardNumber',
    oninput(event) {
        if (regexNumberCard.test(event.target.value)) {
            numberCardSpan.textContent = '';
            event.target.value = event.target.value.slice(0,16)
            numberCardSpan.textContent = event.target.value;
        
          } else {
            event.preventDefault();
            return
          }
     },})
   ]);
   const dataCardInput =  el('div', {className: 'form__input-wrap form__input-wrap_date'}, [el('label',{className: 'form__label form__date-label'}, 'Card Expiry'),
   el('input',{className: 'input input__date',
   oninput(event) {
    dateCardSpan.textContent = event.target.value;
    },})
  ]);
  const cvvCardInput =  el('div', {className: 'form__input-wrap form__input-wrap_cvv'}, [el('label',{className: 'form__label form__cvv-label'}, 'CVV'),
   el('input',{className: 'input input__cvv',
//    oninput(event) {
//     dateCardSpan.textContent = event.target.value;
//     },
    })
  ]);
  //форма с инпутами
   const formWrapper  = el('form', {className: 'form', id: 'form'}, [nameCardInput, numberCardInput, dataCardInput, cvvCardInput, el('button', {className: 'form__button'}, 'CHECK OUT')]);

    setChildren(card, frontCard, formWrapper, );

    setChildren(wrapper, card);
    return wrapper;

  
};

setChildren(document.body, createCard());
