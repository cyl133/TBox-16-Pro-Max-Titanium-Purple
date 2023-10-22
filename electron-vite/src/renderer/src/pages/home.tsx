import Navbar from '@renderer/components/Navbar'

type IssueType = {
  issueNumber: number
  issueName: string
  duration: string
  difficulty: string
  progress: string
  githubIssue: string
}

const Home = () => {
  const generateIssueList = () => {
    return issues.map((issue, counter) => {
      const difficultyClass =
        issue.difficulty === 'Easy' ? 'easy' : issue.difficulty === 'Medium' ? 'medium' : 'hard'
      const issueStatusFile =
        issue.progress === 'Open'
          ? 'notStarted'
          : issue.progress === 'In Progress'
          ? 'inProgress'
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

const IssueComponent = ({
  issueStatusFile,
  difficultyClass,
  issue
}: {
  issueStatusFile: string
  difficultyClass: string
  issue: IssueType
}) => {
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

  return (
    <div style={generateBackgroundColor()}>
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
            paddingBottom: '6px'
          }}
        >
          {issue.issueName} #{issue.issueNumber}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: 'white'
          }}
        >
          ${issue.duration}
        </div>
      </div>
      {/* <div>
        <img src="./assets/icon/playPause/play.svg" alt="Play" />
      </div> */}
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

export default Home
