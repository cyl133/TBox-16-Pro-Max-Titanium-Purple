import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className="home">
      <div className="Home">
        <Link to="/">Home</Link>
      </div>
      <div className="Settings">
        <Link to="/Settings">Settings</Link>
      </div>
    </div>
  )
}

const IssueComponent = (
  issueStatusFile: string,
  issue: {
    issueName: string
    issueNumber: number
    duration: string
  }
) => {
  return (
    <div>
      <img
        src={`./assets/icon/issueStatus/${issueStatusFile}.svg`}
        alt={issueStatusFile}
        className="progress-icon"
      />
      <div className={styles.issueColumn}>
        <div className={styles.issueTitle}>
          ${issue.issueName} #${issue.issueNumber}
        </div>
        <div className={styles.issueTime}>${issue.duration}</div>
      </div>
      <div className={styles.iconButton}>
        <img src="./assets/icon/playPause/play.svg" alt="Play" className="icon" />
      </div>
    </div>
  )
}

export default Home
