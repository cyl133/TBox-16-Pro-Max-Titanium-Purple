import { IssueType } from '@renderer/pages/home'
import PauseIcon from '../assets/playPause/pause.svg'
import CompleteIcon from '../assets/playPause/complete.svg'
import { useEffect, useState } from 'react'

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

  const stopTimer = () => {
    setIsRunning(false)
  }

  const completeTimer = () => {}

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
    <div
      style={{
        backgroundColor: 'purple',
        height: '300px',
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
        {issue?.issueName} · #{issue?.issueNumber}
      </div>
      <div>{seconds} seconds remaining</div>
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
          text={issue.difficulty}
          textColor={getButtonStyle(issue.difficulty)}
        />
      </div>
      <div
        style={{
          flexDirection: 'row',
          display: 'flex'
        }}
      >
        <ButtonComponent onClick={stopTimer} component={<PauseIcon />} text={'PAUSE'} />
        <ButtonComponent onClick={completeTimer} component={<CompleteIcon />} text={'COMPLETE'} />
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
    <div>
      <div
        style={{
          fontWeight: 500,
          fontSize: '14px',
          color: '#838792'
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
  component: JSX.Element
  text: string
}) => {
  return (
    <div style={{ flexDirection: 'row', justifyContent: 'center', display: 'flex' }}>
      <div
        onClick={onClick}
        style={{
          marginRight: '30px'
        }}
      >
        {component}
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
