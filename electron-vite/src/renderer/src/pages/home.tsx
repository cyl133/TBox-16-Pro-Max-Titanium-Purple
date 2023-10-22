import IssueTimer from '@renderer/components/IssueTimer'
import Navbar from '@renderer/components/Navbar'
import notStartedIcon from '../assets/issueStatus/notStarted.svg'
import inProgressIcon from '../assets/issueStatus/inProgress.svg'
import completedIcon from '../assets/issueStatus/completed.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { formatMilliseconds, formatMillisecondsString, issues_data } from '@renderer/constants'

export type IssueType = {
  issue_title: string
  issue_number: number
  issue_state: string
  is_timer_on: boolean
  originalTime: number // miliseconds
  remainingTime: number // miliseconds
  startTime: Date | null
  is_confirmed: boolean
  difficulty: string
  stressLevel: string
}

const Home = () => {
  const [issues, setIssues] = useState<IssueType[]>()

  const generateIssueList = () => {
    console.log('issues', issues)
    return issues?.map((issue, counter) => {
      const difficultyClass =
        issue.difficulty === 'easy' ? 'easy' : issue.difficulty === 'medium' ? 'medium' : 'hard'
      const issueStatusFile =
        issue.is_timer_on && issue.issue_state.toLowerCase() === 'open'
          ? 'inProgress'
          : issue.issue_state.toLowerCase() === 'close'
          ? 'completed'
          : 'notStarted'

      return (
        <IssueComponent
          key={counter}
          issueStatusFile={issueStatusFile}
          difficultyClass={difficultyClass}
          issue={issue}
        />
      )
    })
  }

  useEffect(() => {
    const fetchIssues = async () => {
      // const url = 'https://c038-172-58-219-55.ngrok-free.app/get_issues'
      // const url = 'http://localhost:3000/get_issues'

      // try {
      //   // Fetching data from the server
      //   const response = await fetch(url, {
      //     method: 'GET', // Making an external GET request to fetch issues
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   })

      //   // console.log('response is', response)
      //   const data = await response.text()
      //   console.log('data is', data)

      //   if (response.ok) {
      //     // Update state with the issues
      //     // setIssues(data)
      //   } else {
      //     console.error('Server response was not ok.')
      //   }
      // } catch (error) {
      //   console.error('Fetching data failed', error)
      // }

      setIssues(issues_data)
    }

    fetchIssues().then(() => generateIssueList())
  }, []) // Empty dependency array means this useEffect runs once when the component mounts

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          overflow: 'auto',
          height: '740px'
        }}
      >
        {generateIssueList()}
      </div>
      <Navbar />
    </div>
  )
}

const getIcon = (progressLevel: string) => {
  switch (progressLevel) {
    case 'notStarted':
      return notStartedIcon
    case 'inProgress':
      return inProgressIcon
    case 'completed':
      return completedIcon
    default:
      return notStartedIcon
  }
}

export const IssueComponent = ({
  issueStatusFile,
  difficultyClass,
  issue
}: {
  issueStatusFile: string
  difficultyClass: string
  issue: IssueType
}) => {
  const [isTimerStarted, setIsTimerStarted] = useState(false)

  const generateBackgroundColor = () => {
    const style = {
      padding: '30px 40px 30px 40px'
    }

    switch (difficultyClass) {
      case 'easy':
        return {
          ...style,
          backgroundColor: '#7CADB9'
        }
      case 'medium':
        return {
          ...style,
          backgroundColor: '#FC9E35'
        }
      case 'hard':
        return {
          ...style,
          backgroundColor: '#E15566'
        }
    }
  }

  const onClickStartButton = (e): void => {
    e.preventDefault()
    e.stopPropagation()
    setIsTimerStarted(true)
  }

  const renderView = () => {
    if (isTimerStarted) {
      return (
        <IssueTimer
          issue={issue}
          duration={issue.remainingTime}
          targetTime={formatMilliseconds(issue.originalTime)}
        />
      )
    } else {
      return (
        <Link to={`/editIssue/${issue.issue_number}`}>
          <div style={{ ...generateBackgroundColor(), display: 'flex', alignItems: 'center' }}>
            <img
              src={getIcon(issueStatusFile)}
              alt={issueStatusFile}
              style={{ marginRight: '10px' }}
            />
            {/* <img src={`./assets/icon/issueStatus/${issueStatusFile}.svg`} alt={issueStatusFile} /> */}
            <div
              style={{
                width: '80%',
                padding: '0px 0px 0px 18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                whiteSpace: 'nowrap',
                /* Prevent text from wrapping to the next line */
                overflow: 'hidden',
                /* Hide the overflow */
                textOverflow: 'ellipsis'
                /* Show an ellipsis (...) when text overflows */
              }}
            >
              <div
                style={{
                  flex: 1,
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 500,
                  paddingBottom: '6px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {issue.issue_title} #{issue.issue_number}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'white',
                  fontWeight: '500'
                }}
              >
                {formatMillisecondsString(issue.originalTime)}
              </div>
            </div>
            <button onClick={onClickStartButton}>Hello there</button>

            {/* {isClickedContainer && <Navigate to={`/editIssue/${issue.issueNumber}`} />}) */}
            {/* <div>
        <img src="./assets/icon/playPause/play.svg" alt="Play" />
      </div> */}
          </div>
        </Link>
      )
    }
  }

  return renderView()
}

export default Home
