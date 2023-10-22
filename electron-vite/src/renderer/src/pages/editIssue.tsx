import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { EditTimeComponent } from './gettingStarted'
import { useState } from 'react'
import Navbar from '@renderer/components/Navbar'
import backIcon from '../assets/playPause/back.svg'
import nextIcon from '../assets/playPause/complete.svg';

const PADDING_HORIZONTAL = '50px'
const PADDING_VERTICAL = '29px'

const EditIssue = () => {
  const { issueNumber } = useParams()
  const issue = issues.find((item) => item.issueNumber === parseInt(issueNumber))
  const [difficultySelected, setDifficultySelected] = useState(issue?.difficulty || 'Easy')
  const [isSuccess, setSuccess] = useState(false)
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const onPressDifficulty = (difficulty: string) => {
    setDifficultySelected(difficulty)
  }

  const onClick = () => {
    // TODO: make api call

    setSuccess(true)
  }

  const getStyle = () => {
    const style = {
      height: '300px',
      position: 'relative',
      // width: '100%',
      padding: `${PADDING_VERTICAL} ${PADDING_HORIZONTAL} ${PADDING_VERTICAL} ${PADDING_HORIZONTAL}`
    }
    switch (issue?.difficulty) {
      case 'Easy':
        return {
          ...style,
          backgroundColor: '#7CADB9'
        }
      case 'Medium':
        return {
          ...style,
          backgroundColor: '#FC9E35'
        }
      case 'Hard':
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
        <button onClick={goBack}
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
          {issue?.issueName} · #{issue?.issueNumber}
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
        <button onClick={onClick}
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

const DifficultyComponent = ({ difficultySelected, onPressDifficulty }) => {
  const getButtonStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#7CADB9'
      case 'Medium':
        return '#FC9E35'
      case 'Hard':
        return '#E15566'
    }
  }

  const getButtons = (buttonColor: string, onPressDifficulty: (difficulty: string) => void) => {
    const getTypeOfStyle = (difficulty: string) => {
      const style = {
        borderRadius: '5px',
        marginRight: '10px',
        width: '80px',
        height: '30px',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
      }

      if (difficultySelected === buttonColor) {
        return {
          ...style,
          border: `1px solid ${getButtonStyle(difficulty)}`,
          cursor: 'pointer', // to change the cursor when hovered over the button
          borderRadius: '4px', // to make the buttons have rounded corners
          textAlign: 'center', // to center-align the text
          transition: 'transform 0.3s ease, box-shadow 0.3s ease', // for a smooth transition effect
          boxShadow: '0px 2px 5px rgba(0,0,0,0.1)', // to give a slight elevation effect
          // borderColor: getButtonStyle(difficulty),
          backgroundColor: getButtonStyle(difficulty),
          color: 'white'
        }
      } else {
        return {
          ...style,
          cursor: 'pointer', // to change the cursor when hovered over the button
          borderRadius: '4px', // to make the buttons have rounded corners
          textAlign: 'center', // to center-align the text
          alignItems: 'center',
          justifyContent: 'center',
          // transition: 'transform 0.3s ease, box-shadow 0.3s ease', // for a smooth transition effect
          boxShadow: '0px 2px 5px rgba(0,0,0,0.1)', // to give a slight elevation effect
          // border: '1px',
          // borderColor: getButtonStyle(difficulty),
          border: `1px solid ${getButtonStyle(difficulty)}`,
          color: getButtonStyle(difficulty)
        }
      }
    }

    return (
      <div style={getTypeOfStyle(buttonColor)} onClick={() => onPressDifficulty(buttonColor)}>
        {buttonColor}
      </div>
    )
  }

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
      <div
        style={{
          flexDirection: 'row',
          flex: 1,
          display: 'flex'
        }}
      >
        {getButtons('Easy', onPressDifficulty)}
        {getButtons('Medium', onPressDifficulty)}
        {getButtons('Hard', onPressDifficulty)}
      </div>
    </div>
  )
}

const issues = [
  {
    issueNumber: 1,
    issueName: 'Add user authentication',
    duration: '2 days',
    difficulty: 'Medium',
    progress: 'Open',
    githubIssue: 'https://github.com/your-repo/your-project/issues/1'
  },
  {
    issueNumber: 2,
    issueName: 'Implement responsive design',
    duration: '1 day',
    difficulty: 'Easy',
    progress: 'Closed',
    githubIssue: 'https://github.com/your-repo/your-project/issues/2'
  },
  {
    issueNumber: 3,
    issueName: 'Fix bug in data retrieval',
    duration: '3 days',
    difficulty: 'Hard',
    progress: 'In Progress',
    githubIssue: 'https://github.com/your-repo/your-project/issues/3'
  },
  {
    issueNumber: 4,
    issueName: 'Refactor codebase',
    duration: '4 days',
    difficulty: 'Medium',
    progress: 'Open',
    githubIssue: 'https://github.com/your-repo/your-project/issues/4'
  },
  {
    issueNumber: 5,
    issueName: 'Optimize database queries',
    duration: '2 days',
    difficulty: 'Medium',
    progress: 'In Progress',
    githubIssue: 'https://github.com/your-repo/your-project/issues/5'
  },
  {
    issueNumber: 6,
    issueName: 'Add unit tests',
    duration: '1 day',
    difficulty: 'Easy',
    progress: 'Closed',
    githubIssue: 'https://github.com/your-repo/your-project/issues/6'
  },
  {
    issueNumber: 3,
    issueName: 'Fix bug in data retrieval',
    duration: '3 days',
    difficulty: 'Hard',
    progress: 'In Progress',
    githubIssue: 'https://github.com/your-repo/your-project/issues/3'
  },
  {
    issueNumber: 4,
    issueName: 'Refactor codebase',
    duration: '4 days',
    difficulty: 'Medium',
    progress: 'Open',
    githubIssue: 'https://github.com/your-repo/your-project/issues/4'
  },
  {
    issueNumber: 5,
    issueName: 'Optimize database queries',
    duration: '2 days',
    difficulty: 'Medium',
    progress: 'In Progress',
    githubIssue: 'https://github.com/your-repo/your-project/issues/5'
  },
  {
    issueNumber: 6,
    issueName: 'Add unit tests',
    duration: '1 day',
    difficulty: 'Easy',
    progress: 'Closed',
    githubIssue: 'https://github.com/your-repo/your-project/issues/6'
  }
]
export default EditIssue
