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
  calenderTextHeader.textContent = format(selectedDate, "MMMM - Y")

  getDates(selectedDate)
})

function setButtonDate(date) {
  datePickerButton.textContent = format(date, "MMMM do, Y")
  datePickerButton.dataset.selectedDate = getUnixTime(date)
}

setButtonDate(currentDate)

function getDates(date) {
  const initialWeekDay = startOfWeek(startOfMonth(date))
  const finalWeekDay = endOfWeek(endOfMonth(date))

  const dates = eachDayOfInterval({ start: initialWeekDay, end: finalWeekDay })

  calenderGrid.innerHTML = ""

  dates.forEach((date) => {
    const dateElement = document.createElement("button")
    dateElement.classList.add("date")
    dateElement.textContent = date.getDate()

    if (!isSameMonth(date, currentDate)) {
      dateElement.classList.add("date-picker-other-month-date")
    }

    calenderGrid.append(dateElement)
  })
}

nextMonthButton.addEventListener("click", () => {
  currentDate = addMonths(currentDate, 1)

  calenderTextHeader.textContent = format(currentDate, "MMMM - Y")

  getDates(currentDate)
})

previousMonthButton.addEventListener("click", () => {
  currentDate = subMonths(currentDate, 1)

  calenderTextHeader.textContent = format(currentDate, "MMMM - Y")

  getDates(currentDate)
})
