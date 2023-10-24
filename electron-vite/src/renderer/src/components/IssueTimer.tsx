import { IssueType } from '@renderer/pages/home'
import pauseIcon from '../assets/playPause/pause.svg'
import completeIcon from '../assets/playPause/complete.svg'
import playIcon from '../assets/playPause/play-big.svg'
import { useEffect, useState } from 'react'
import { showNotification } from './notification'
import { formatMilliseconds } from '@renderer/constants'

const IssueTimer = ({
  issue,
  duration,
  targetTime
}: {
  issue: IssueType
  duration: number
  targetTime: string
}) => {
  const [seconds, setSeconds] = useState(duration)
  const [isRunning, setIsRunning] = useState(true)
  const [timerRepresentation, setTimer] = useState(formatMilliseconds(duration))

  const getButtonStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#7CADB9'
      case 'Medium':
        return '#FC9E35'
      case 'Hard':
        return '#E15566'
      default:
        return 'black'
    }
  }

  const toggletTimer = () => {
    setIsRunning(!isRunning)
  }

  const completeTimer = () => {}

  useEffect(() => {
    let interval

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1)
        // setTimer(() => formatMilliseconds(seconds))
      }, 1000)
    }

    if (seconds === 0) {
      showNotification()
      setIsRunning(false) // Add this condition
    }

    return () => {
      clearInterval(interval)
    }
  }, [isRunning, seconds])

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '90px 40px 30px 40px'
      }}
    >
      <div
        style={{
          fontSize: '14px',
          color: '#838792',
          fontWeight: 500,
          marginBottom: '16px'
        }}
      >
        {issue?.issue_title.toUpperCase()} · #{issue?.issue_number}
      </div>
      <div
        style={{
          fontWeight: 'lighter',
          fontSize: '82px',
          color: 'black',
          marginBottom: '40px'
        }}
      >
        {seconds} seconds
      </div>
      <div
        style={{
          flexDirection: 'row',
          marginBottom: '50px',
          display: 'flex'
        }}
      >
        <MiniComponent title={'TARGET TIME'} text={targetTime} textColor="black" />
        <MiniComponent
          title={'DIFFICULTY'}
          text={issue.difficulty.toUpperCase()}
          textColor={getButtonStyle(issue.difficulty)}
        />
      </div>
      <div
        style={{
          flexDirection: 'row',
          display: 'flex'
        }}
      >
        <ButtonComponent
          onClick={toggletTimer}
          component={isRunning ? pauseIcon : playIcon}
          text={isRunning ? 'PAUSE' : 'PLAY'}
        />
        <ButtonComponent onClick={completeTimer} component={completeIcon} text={'COMPLETE'} />
      </div>
    </div>
  )
}

const MiniComponent = ({
  title,
  text,
  textColor
}: {
  title: string
  text: string
  textColor: string
}) => {
  return (
    <div
      style={{
        marginRight: '24px'
      }}
    >
      <div
        style={{
          fontWeight: 500,
          fontSize: '14px',
          color: '#838792',
          marginBottom: '16px'
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontWeight: 500,
          fontSize: '16px',
          color: textColor
        }}
      >
        {text}
      </div>
    </div>
  )
}

const ButtonComponent = ({
  onClick,
  component,
  text
}: {
  onClick: () => void
  component: string
  text: string
}) => {
  return (
    <div
      style={{
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginRight: '30px'
      }}
    >
      <div
        onClick={onClick}
        style={{
          cursor: 'pointer'
        }}
      >
        <img src={component} alt={component} style={{ marginRight: '10px' }} />
      </div>
      <div
        style={{
          fontWeight: 500,
          fontSize: '14px',
          color: '#838792'
        }}
      >
        {text}
      </div>
    </div>
  )
}

export default IssueTimer
