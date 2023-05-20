import { CaretLeft, CaretRight } from 'phosphor-react'

import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'
import { getWeekDays } from '@/utils/get-week-days'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => dayjs().set('date', 1))

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    return daysInMonthArray
  }, [currentDate])

  function handlePreviousMonth() {
    setCurrentDate(currentDate.subtract(1, 'month'))
  }

  function handleNextMonth() {
    setCurrentDate(currentDate.add(1, 'month'))
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button title="Previous month" onClick={handlePreviousMonth}>
            <CaretLeft />
          </button>
          <button title="Next Month" onClick={handleNextMonth}>
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
          <tr>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>1</CalendarDay>
            </td>
            <td>
              <CalendarDay disabled>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
