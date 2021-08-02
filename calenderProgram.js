import {
  format,
  getUnixTime,
  fromUnixTime,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  addMonths,
  subMonths,
  isSameDay,
  isFirstDayOfMonth,
  lastDayOfWeek,
  lastDayOfMonth,
} from "date-fns"

const datePickerButton = document.querySelector(".date-picker-button")
const calenderElement = document.querySelector(".date-picker")
const calenderTextHeader = document.querySelector(".current-month")
const calenderGrid = document.querySelector(".date-picker-grid-dates")
const nextMonthButton = document.querySelector(".next-month-button")
const previousMonthButton = document.querySelector(".prev-month-button")
let currentDate = new Date()

datePickerButton.addEventListener("click", () => {
  calenderElement.classList.toggle("show")
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)

  currentDate = selectedDate

  setupDatePicker(selectedDate)
})

function setDate(date) {
  datePickerButton.innerText = format(date, "MMMM do, y")
  datePickerButton.dataset.selectedDate = getUnixTime(date)

  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)

  currentDate = selectedDate

  setupDatePicker(selectedDate)
}

function setupDatePicker(selectedDate) {
  calenderTextHeader.innerText = format(currentDate, "MMMM - y")

  setupDates(selectedDate)
}

function setupDates(selectedDate) {
  const firstDayOfWeek = startOfWeek(startOfMonth(currentDate))
  const lastDayOfWeek = endOfWeek(endOfMonth(currentDate))

  const dates = eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfWeek })

  calenderGrid.innerHTML = ""

  dates.forEach((date) => {
    const element = document.createElement("button")
    element.classList.add("date")
    element.innerText = date.getDate()

    if (!isSameMonth(date, currentDate)) {
      element.classList.add("date-picker-other-month-date")
    }

    if (isSameDay(date, selectedDate)) {
      element.classList.add("selected")
    }

    element.addEventListener("click", () => {
      setDate(date)
      const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
      setupDatePicker(selectedDate)
    })

    calenderGrid.append(element)
  })
}

nextMonthButton.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  currentDate = addMonths(currentDate, 1)
  setupDatePicker(selectedDate)
})
previousMonthButton.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  currentDate = subMonths(currentDate, 1)

  setupDatePicker(selectedDate)
})

setDate(new Date())

// let currentDate = new Date()

// //Detects a click on the date picker button
// datePickerButton.addEventListener("click", () => {
//   //shows and unshows the calender element
//   calenderElement.classList.toggle("show")
//   //Gets the date of the current date from the button element
//   const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
//   //Sets the text content to the selected date
//   calenderTextHeader.textContent = format(selectedDate, "MMMM - Y")

//   //Calls getDates function in order to add in dates to the grid dynamically
//   getDates(selectedDate)
// })

// calenderGrid.addEventListener("click", () => {
//   getDates(currentDate)
// })

// function setButtonDate(date) {
//   datePickerButton.textContent = format(date, "MMMM do, Y")
//   datePickerButton.dataset.selectedDate = getUnixTime(date)
// }

// setButtonDate(currentDate)

// function getDates(selectedDate) {
//   const initialWeekDay = startOfWeek(startOfMonth(selectedDate))
//   const finalWeekDay = endOfWeek(endOfMonth(selectedDate))

//   const dates = eachDayOfInterval({ start: initialWeekDay, end: finalWeekDay })

//   calenderGrid.innerHTML = ""

//   dates.forEach((date) => {
//     const dateElement = document.createElement("button")
//     dateElement.classList.add("date")
//     dateElement.textContent = date.getDate()

//     if (!isSameMonth(date, selectedDate)) {
//       dateElement.classList.add("date-picker-other-month-date")
//     }

//     if (isSameDay(date, currentDate)) {
//       dateElement.classList.add("selected")
//     }

//     dateElement.addEventListener("click", () => {
//       setButtonDate(date)
//       dateElement.classList.add("selected")
//       calenderElement.classList.remove("show")
//     })

//     calenderGrid.append(dateElement)
//   })
// }

// nextMonthButton.addEventListener("click", () => {
//   currentDate = addMonths(currentDate, 1)

//   calenderTextHeader.textContent = format(currentDate, "MMMM - Y")
//   const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
//   getDates(selectedDate)
// })

// previousMonthButton.addEventListener("click", () => {
//   currentDate = subMonths(currentDate, 1)

//   calenderTextHeader.textContent = format(currentDate, "MMMM - Y")
//   const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
//   getDates(selectedDate)
// })
