const tipContainer = document.querySelector('.tips_container');
const tipBtns = tipContainer.querySelectorAll('.btn');
const errorMsgs = document.querySelectorAll('.error_msg');
const billInput = document.querySelector('#bill');
const pplNbr = document.querySelector('#ppl_number');
const tipAmountText = document.querySelector('.tip_amount');
const totalBillText = document.querySelector('.total_bill');
const customInput = document.querySelector('.custom_input');
const resetBtn = document.querySelector('.reset.btn');

function checkInput() {
  let isValid = true;
  const totalBill = parseFloat(billInput.value);
  const numberOfPpl = parseInt(pplNbr.value, 10);
  if (totalBill <= 0) {
    errorMsgs[0].classList.remove('hidden');
    isValid = false;
  } if (numberOfPpl <= 0) {
    errorMsgs[2].classList.remove('hidden');
    isValid = false;
  }
  return isValid;
}

function showResult(tipAmount, totalToPay) {
  tipAmountText.textContent = `$${tipAmount.toFixed(2)}`;
  totalBillText.textContent = `$${totalToPay.toFixed(2)}`;
}

function calculateTip(p) {
  if (checkInput()) {
    const totalBill = parseFloat(billInput.value);
    const numberOfPpl = parseInt(pplNbr.value, 10);
    const tipAmount = ((totalBill * p) / 100) / numberOfPpl;
    const totalToPay = (totalBill / numberOfPpl) + tipAmount;
    showResult(tipAmount, totalToPay);
  }
}

function reset() {
  billInput.value = 0;
  pplNbr.value = 0;
  tipAmountText.textContent = '$0.00';
  totalBillText.textContent = '$0.00';
}

tipBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const percentage = btn.textContent.slice(0, -1);
    calculateTip(percentage);
  });
});

customInput.addEventListener('input', () => {
  const percentage = parseFloat(customInput.value);
  if (billInput.value.trim('') === ''
    || pplNbr.value.trim('') === '' || customInput.value.trim('') === '') {
    return;
  }
  if (percentage <= 0 || percentage > 100) {
    errorMsgs[1].classList.remove('hidden');
  } else {
    errorMsgs[1].classList.add('hidden');
    calculateTip(percentage);
  }
});

billInput.addEventListener('input', () => {
  if (parseFloat(billInput.value) > 0) {
    errorMsgs[0].classList.add('hidden');
  }
});

pplNbr.addEventListener('input', () => {
  if (parseInt(pplNbr.value, 10) > 0) {
    errorMsgs[1].classList.add('hidden');
  }
});

resetBtn.addEventListener('click', reset);
