const totalBillInput = document.getElementById('bill-amount')
const tipPercentButtons = document.getElementsByClassName('tip-percent-btn')
const tipPercentButtonsArray = Array.from(tipPercentButtons)
const tipPercentCustomInput = document.getElementById('tip-percent-input')
const totalPeopleInput = document.getElementById('number-costumer')
const tipAmountStrong = document.getElementById('tip-amount')
const totalStrong = document.getElementById('total')
const resetButton = document.getElementById('reset-button')

let tipCalculatorState = {
  totalBill: 0,
  percentSelected: false,
  tipPercent: 0,
  people: 0,
  totalTip: 0,
  tipForEach: 0,
  totalForEach: 0
}

const INPUT_OUTLINE_STYLE = '1px solid var(--strong-cyan)'

const handleTotalBillChange = (e) => {
  tipCalculatorState.totalBill = Number(e.target.value)
  calculateAndUpdateScreen()
}

const handlePeopleChange = (e) => {
  tipCalculatorState.people = Number(e.target.value)
  calculateAndUpdateScreen()

}

const handleTipButtonClick = (e) => {
  tipPercentCustomInput.value = ''
  tipCalculatorState.percentSelected = true
  tipCalculatorState.tipPercent = Number(e.target.value)
  addTipButtonSelection(e.target)
  calculateAndUpdateScreen()
}

const addTipButtonSelection = (button) => {
  tipPercentButtonsArray.forEach(btn => {
    btn.classList.remove('selected')
  })
  button.classList.add('selected')
  tipCalculatorState.percentSelected = true
}

const handleTipCustomChange = (e) => {
  tipPercentButtonsArray.forEach(btn => {
    btn.classList.remove('selected')
  })
  tipCalculatorState.tipPercent = Number(e.target.value)/100
  tipCalculatorState.percentSelected = true
  calculateAndUpdateScreen()
}

const handleResetClick = () => {
  tipCalculatorState.people = 0
  tipCalculatorState.percentSelected = false
  tipCalculatorState.tipForEach = 0
  tipCalculatorState.tipPercent = 0
  tipCalculatorState.totalBill = 0
  tipCalculatorState.totalForEach = 0
  tipCalculatorState.totalTip = 0

  tipPercentButtonsArray.forEach(btn => {
    btn.classList.remove('selected')
  })

  totalBillInput.value = ''
  totalPeopleInput.value = ''
  tipPercentCustomInput.value = ''
  totalStrong.innerText = '0.00'
  tipAmountStrong.innerText = '0.00'
}

const calculateTotalTip = () => {
  const { tipPercent, totalBill } = tipCalculatorState
  if (!tipPercent || !totalBill) return   
  const totalTip = totalBill * tipPercent
  tipCalculatorState.totalTip = totalTip
  return
}

const calculateTipForEach = () => {
  const { totalTip, people } = tipCalculatorState
  const tipForEach = Math.round((totalTip / people)*100)/100
  tipCalculatorState.tipForEach = tipForEach
  return
}

const calculateTotalForEach = () => {
  const { people, totalBill, totalTip } = tipCalculatorState
  const totalForEach = Math.round(((totalBill + totalTip) / people)*100)/100
  tipCalculatorState.totalForEach = totalForEach
  return
}

const updateScreen = (element, value) => {
  element.innerText = `$${value}`
}


const calculateAndUpdateScreen = () => {
  if (tipCalculatorState.people && tipCalculatorState.percentSelected && tipCalculatorState.totalBill) {
    calculateTotalTip()
    calculateTipForEach()
    calculateTotalForEach()
    updateScreen(totalStrong, tipCalculatorState.totalForEach)
    updateScreen(tipAmountStrong, tipCalculatorState.tipForEach)
  }
  return
}

const handleFocusInInput = (e) => {
  e.target.parentElement.style.outline = INPUT_OUTLINE_STYLE
}

const handleFocusOutInput = (e) => {
  e.target.parentElement.style.outline = 'none'
}

totalBillInput.addEventListener('keyup', handleTotalBillChange)
totalBillInput.addEventListener('focusin', handleFocusInInput)
totalBillInput.addEventListener('focusout', handleFocusOutInput)
totalPeopleInput.addEventListener('keyup', handlePeopleChange)
totalPeopleInput.addEventListener('focusin', handleFocusInInput)
totalPeopleInput.addEventListener('focusout', handleFocusOutInput)
tipPercentCustomInput.addEventListener('keyup', handleTipCustomChange)
resetButton.addEventListener('click', handleResetClick)

tipPercentButtonsArray.forEach(button => {
  button.addEventListener('click', handleTipButtonClick)
})

