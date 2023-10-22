import { useState } from 'react'
import { CheckInTimeComponent } from './gettingStarted'
import { Navigate } from 'react-router-dom'
import Navbar from '@renderer/components/Navbar'

const Settings = (): JSX.Element => {
  const [checkInMinutes, setCheckInMinutes] = useState(0)

  const [isSuccess, setSuccess] = useState(false)
  const onSubmit = () => {
    console.log('checkInMinutes is', checkInMinutes)

    setSuccess(true)
  }

  return (
    <div>
      <div
        style={{
          padding: '70px 50px 50px 50px'
        }}
      >
        <CheckInTimeComponent minutes={checkInMinutes} setMinutes={setCheckInMinutes} />
        <div>
          <button onClick={onSubmit}>Hello there</button>
          <img src="complete.svg" alt="Complete" />
        </div>
        {isSuccess && <Navigate to="/home" replace={true} />}
      </div>
      <Navbar />
    </div>
  )
}

export default Settings
