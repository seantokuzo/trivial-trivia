import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import accurateInterval from '../utils/accurateInterval'
import { TIME_PER_QUESTION } from '../assets/data/constants'

const Timer = () => {
  const { practiceState, submitPracticeAnswers } = useAppContext()
  const { practiceOptions, practiceActive } = practiceState
  const [timeLeft, setTimeLeft] = useState(
    practiceOptions.amount * TIME_PER_QUESTION * 1000
  )
  const [myInterval, setMyInterval] = useState('')

  useEffect(() => {
    if (practiceActive) {
      startTimer()
    }
  }, [practiceActive])

  useEffect(() => {
    if (timeLeft <= 0) {
      submitPracticeAnswers('OUT_OF_TIME')
      setTimeLeft(0)
    }
  }, [timeLeft])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 1000 / 60)
    const secondsNum = Math.floor(time / 1000) - minutes * 60
    const seconds = secondsNum < 10 ? `0${secondsNum}` : secondsNum

    return `${minutes}:${seconds}`
  }

  function decrementTimeLeft() {
    setTimeLeft((prev) => prev - 1000)
  }

  const intervalLength = 1000

  // START THE TIMER USING ACCURATE INTERVAL HELPER FUNCTION
  function startTimer() {
    setMyInterval(
      accurateInterval(() => {
        decrementTimeLeft()
        // checkTimerStatus()
      }, intervalLength)
    )
  }

  return (
    <div className="timer">
      <h3 className="text timer-text">Time Remaining</h3>
      <h3 className="subtitle timer-time">{formatTime(timeLeft)}</h3>
    </div>
  )
}

export default Timer
