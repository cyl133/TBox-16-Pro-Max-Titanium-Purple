import React, { useState, useEffect } from 'react'

const Timer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)

  const startTimer = () => {
    setIsRunning(true)
  }

  const stopTimer = () => {
    setIsRunning(false)
  }

  useEffect(() => {
    let interval

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, seconds])

  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>{seconds} seconds remaining</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  )
}

export default Timer
