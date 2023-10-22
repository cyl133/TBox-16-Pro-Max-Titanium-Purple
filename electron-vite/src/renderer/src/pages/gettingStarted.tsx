import { ReactNode, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

type EditTimeComponentProps = {
  days: number
  onChangeDays: (value: number) => void
  hours: number
  onChangeHours: (value: number) => void
  minutes: number
  onChangeMinutes: (value: number) => void
  seconds: number
  onChangeSeconds: (value: number) => void
  title: string
  color: string
}

export const EditTimeComponent = ({
  title,
  color,
  days,
  onChangeDays,
  hours,
  onChangeHours,
  minutes,
  onChangeMinutes,
  seconds,
  onChangeSeconds
}: EditTimeComponentProps) => {
  return (
    <div
      style={{
        marginBottom: '30px'
      }}
    >
      <div
        style={{
          fontWeight: 500,
          fontSize: '14px',
          color: color,
          marginBottom: '15px'
        }}
      >
        {title}
      </div>
      <div>
        <input
          type="number"
          id="daysInput"
          name="daysInput"
          min="0"
          pattern="\d*"
          value={days}
          onChange={(e) => onChangeDays(parseInt(e.target.value))}
        />
        <span style={{ marginRight: '10px' }}> DAYS </span>
        <input
          type="number"
          id="hoursInput"
          name="hoursInput"
          max="24"
          min="0"
          pattern="\d*"
          value={hours}
          onChange={(e) => onChangeHours(parseInt(e.target.value))}
        />
        <span style={{ marginRight: '10px' }}> HOURS </span>
        <input
          type="number"
          id="minutesInput"
          name="minutesInput"
          max="60"
          min="0"
          pattern="\d*"
          value={minutes}
          onChange={(e) => onChangeMinutes(parseInt(e.target.value))}
        />
        <span style={{ marginRight: '10px' }}> MIN </span>
        <input
          type="number"
          id="secondsInput"
          name="secondsInput"
          max="60"
          min="0"
          pattern="\d*"
          value={seconds}
          onChange={(e) => onChangeSeconds(parseInt(e.target.value))}
        />
        <span style={{ marginRight: '10px' }}> SEC </span>
      </div>
    </div>
  )
}

const CheckInTimeComponent = ({ minutes, setMinutes }) => {
  return (
    <div
      style={{
        marginBottom: '30px'
      }}
    >
      <div
        style={{
          fontWeight: 500,
          fontSize: '14px',
          color: '#838792',
          marginBottom: '15px'
        }}
      >
        CHECK IN TIME
      </div>
      <input
        type="number"
        id="numberInput"
        name="numberInput"
        max="60"
        min="0"
        pattern="\d*"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
      />
      <span style={{ marginRight: '10px' }}> MIN </span>
    </div>
  )
}

const GettingStarted = (): ReactNode => {
  const [easyTicketDays, setEasyTicketDays] = useState(0)
  const [easyTicketHours, setEasyTicketHours] = useState(0)
  const [easyTicketMinutes, setEasyTicketMinutes] = useState(0)
  const [easyTicketSeconds, setEasyTicketSeconds] = useState(0)

  const [mediumTicketDays, setMediumTicketDays] = useState(0)
  const [mediumTicketHours, setMediumTicketHours] = useState(0)
  const [mediumTicketMinutes, setMediumTicketMinutes] = useState(0)
  const [mediumTicketSeconds, setMediumTicketSeconds] = useState(0)

  const [hardTicketDays, setHardTicketDays] = useState(0)
  const [hardTicketHours, setHardTicketHours] = useState(0)
  const [hardTicketMinutes, setHardTicketMinutes] = useState(0)
  const [hardTicketSeconds, setHardTicketSeconds] = useState(0)

  const [checkInMinutes, setCheckInMinutes] = useState(0)

  const [isSuccess, setSuccess] = useState(false)

  const onSubmit = () => {
    console.log('easyTicketDays is', easyTicketDays)
    console.log('easyTicketHours is', easyTicketHours)
    console.log('easyTicketMinutes is', easyTicketMinutes)
    console.log('easyTicketSeconds is', easyTicketSeconds)
    console.log('mediumTicketDays is', mediumTicketDays)
    console.log('mediumTicketHours is', mediumTicketHours)
    console.log('mediumTicketMinutes is', mediumTicketMinutes)
    console.log('mediumTicketSeconds is', mediumTicketSeconds)
    console.log('hardTicketDays is', hardTicketDays)
    console.log('hardTicketHours is', hardTicketHours)
    console.log('hardTicketMinutes is', hardTicketMinutes)
    console.log('hardTicketSeconds is', hardTicketSeconds)
    console.log('checkInMinutes is', checkInMinutes)

    setSuccess(true)
  }

  return (
    <div
      style={{
        padding: '70px 50px 50px 50px'
      }}
    >
      <EditTimeComponent
        title="EASY TICKET TIME"
        color="#7CADB9"
        days={easyTicketDays}
        onChangeDays={setEasyTicketDays}
        hours={easyTicketHours}
        onChangeHours={setEasyTicketHours}
        minutes={easyTicketMinutes}
        onChangeMinutes={setEasyTicketMinutes}
        seconds={easyTicketSeconds}
        onChangeSeconds={setEasyTicketSeconds}
      />
      <EditTimeComponent
        title="MEDIUM TICKET TIME"
        color="#FC9E35"
        days={mediumTicketDays}
        onChangeDays={setMediumTicketDays}
        hours={mediumTicketHours}
        onChangeHours={setMediumTicketHours}
        minutes={mediumTicketMinutes}
        onChangeMinutes={setMediumTicketMinutes}
        seconds={mediumTicketSeconds}
        onChangeSeconds={setMediumTicketSeconds}
      />
      <EditTimeComponent
        title="HARD TICKET TIME"
        color="#E15566"
        days={hardTicketDays}
        onChangeDays={setHardTicketDays}
        hours={hardTicketHours}
        onChangeHours={setHardTicketHours}
        minutes={hardTicketMinutes}
        onChangeMinutes={setHardTicketMinutes}
        seconds={hardTicketSeconds}
        onChangeSeconds={setHardTicketSeconds}
      />
      <CheckInTimeComponent minutes={checkInMinutes} setMinutes={setCheckInMinutes} />
      {isSuccess && <Navigate to="/home" replace={true} />}
      <button onClick={onSubmit}>Hello there</button>
      <img
        src="/Users/sean/Coding/HackHarvard2023/electron-vite/src/renderer/src/assets/playPause/next.svg"
        alt="Settings"
      />
    </div>
  )
}

export default GettingStarted
