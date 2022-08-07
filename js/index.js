const totalBillInput = document.getElementById('bill-amount')
const tipPercentButtons = document.getElementsByClassName('tip-percent-btn')
const tipPercentButtonsArray = Array.from(tipPercentButtons)
const tipPercentCustomInput = document.getElementById('tip-percent-input')
const totalPeopleInput = document.getElementById('number-costumer')
const tipAmountStrong = document.getElementById('tip-amount')
const totalStrong = document.getElementById('total')

let tipCalculatorState = {
  totalBill: 0,
  percentSelected: false,
  tipPercent: 0,
  people: 0,
  totalTip: 0,
  tipForEach: 0,
  totalForEach: 0
}

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


totalBillInput.addEventListener('keyup', handleTotalBillChange)
totalPeopleInput.addEventListener('keyup', handlePeopleChange)
tipPercentCustomInput.addEventListener('keyup', handleTipCustomChange)

tipPercentButtonsArray.forEach(button => {
  button.addEventListener('click', handleTipButtonClick)
})

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
  element.innerText = value
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
