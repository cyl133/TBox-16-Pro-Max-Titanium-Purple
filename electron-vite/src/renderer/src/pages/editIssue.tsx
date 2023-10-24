import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { EditTimeComponent } from './gettingStarted'
import { useEffect, useState } from 'react'
import Navbar from '@renderer/components/Navbar'
import { IssueComponent, IssueType } from './home'
import { getTimeComponents, issues_data } from '@renderer/constants'
import backIcon from '../assets/playPause/back.svg'
import nextIcon from '../assets/playPause/complete.svg'
import { DifficultyComponentRow } from '@renderer/components/DifficultyComponentRow'
import { DifficultyEnum } from '@renderer/types/types'

const PADDING_HORIZONTAL = '50px'
const PADDING_VERTICAL = '29px'

const EditIssue = () => {
  const { issueNumber } = useParams()
  const [issues, setIssues] = useState<IssueType[]>()
  const issue = issues?.find((item: IssueType) => item.issue_number === parseInt(issueNumber))
  const [difficultySelected, setDifficultySelected] = useState<DifficultyEnum | undefined>(
    issue?.difficulty || DifficultyEnum.EASY
  )
  const [isSuccess, setSuccess] = useState(false)
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const [days, setDays] = useState(getTimeComponents(issue?.originalTime).days || 0)
  const [hours, setHours] = useState(getTimeComponents(issue?.originalTime).hours || 0)
  const [minutes, setMinutes] = useState(getTimeComponents(issue?.originalTime).minutes || 0)
  const [seconds, setSeconds] = useState(getTimeComponents(issue?.originalTime).seconds || 0)

  console.log('button difficulty is', issue?.difficulty)

  console.log('original time is', issue?.originalTime)
  console.log(getTimeComponents(issue?.originalTime).seconds)

  useEffect(() => {
    setDays(getTimeComponents(issue?.originalTime).days || 0)
    setHours(getTimeComponents(issue?.originalTime).hours || 0)
    setMinutes(getTimeComponents(issue?.originalTime).minutes || 0)
    setSeconds(getTimeComponents(issue?.originalTime).seconds || 0)
  }, [issue])

  useEffect(() => {
    setDifficultySelected(issue?.difficulty)
  }, [issue?.difficulty])

  const onPressDifficulty = (difficulty: DifficultyEnum): void => {
    setDifficultySelected(difficulty)
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
  }, [issue]) // Empty dependency array means this useEffect runs once when the component mounts

  const generateIssueList = () => {
    return issues?.map((issue, counter) => {
      const difficultyClass =
        issue.difficulty === 'easy' ? 'easy' : issue.difficulty === 'medium' ? 'medium' : 'hard'
      const issueStatusFile =
        issue.is_timer_on && issue.issue_state.toLowerCase() === 'open'
          ? 'inProgress'
          : !issue.is_timer_on && issue.issue_state.toLowerCase() === 'open'
          ? 'open'
          : 'completed'

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

  const onClick = () => {
    // TODO: make api call

    setSuccess(true)
  }

  const getStyle = () => {
    const style = {
      height: '250px',
      position: 'relative',
      // width: '100%',
      padding: `${PADDING_VERTICAL} ${PADDING_HORIZONTAL} ${PADDING_VERTICAL} ${PADDING_HORIZONTAL}`
    }
    switch (issue?.difficulty) {
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
      default:
        return {
          ...style,
          backgroundColor: '#7CADB9'
        }
    }
  }

  return (
    <div>
      <div style={getStyle()}>
        <button
          onClick={goBack}
          style={{
            position: 'absolute',
            top: '41px',
            left: '45px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }}
        >
          <img src={backIcon} alt="Back" />
        </button>
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '20px',
            color: 'white',
            position: 'absolute',
            bottom: PADDING_VERTICAL,
            left: PADDING_HORIZONTAL
          }}
        >
          {issue?.issue_title} · #{issue?.issue_number}
        </div>
      </div>
      <div
        style={{
          padding: '50px 50px 50px 50px'
        }}
      >
        <EditTimeComponent
          title="TARGET TIME"
          color="#838792"
          days={days}
          onChangeDays={setDays}
          hours={hours}
          onChangeHours={setHours}
          minutes={minutes}
          onChangeMinutes={setMinutes}
          seconds={seconds}
          onChangeSeconds={setSeconds}
        />
        <DifficultyComponent
          difficultySelected={difficultySelected}
          onPressDifficulty={onPressDifficulty}
        />
        {isSuccess && <Navigate to="/home" replace={true} />}
        <button
          onClick={onClick}
          style={{
            position: 'absolute',
            bottom: '106px',
            right: '57px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }}
        >
          <img src={nextIcon} alt="Next" />
        </button>
      </div>
      <Navbar />
    </div>
  )
}

const DifficultyComponent = ({
  difficultySelected,
  onPressDifficulty
}: {
  difficultySelected: DifficultyEnum
  onPressDifficulty: (difficulty: DifficultyEnum) => void
}) => {
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
        DIFFICULTY (RECOMMENDED BY AI)
      </div>
      <DifficultyComponentRow difficultySelected={difficultySelected} onClick={onPressDifficulty} />
    </div>
  )
}
export default EditIssue
