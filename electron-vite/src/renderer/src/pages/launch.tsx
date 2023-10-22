import React from 'react'
import { Link } from 'react-router-dom'

const Launch = (): JSX.Element => {
  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: '120px'
      }}
    >
      <h1
        style={{
          fontWeight: 500,
          fontSize: '56px',
          alignSelf: 'center',
          paddingBottom: '17px',
          color: 'black'
        }}
      >
        TBox 16 ProMax
      </h1>
      <div style={{ paddingBottom: '52px', alignItems: 'center' }}>
        IAmSpeed applies LLMs to solve time boxing and time estimation{' '}
      </div>
      <Link
        to="/gettingStarted"
        style={{
          height: '49px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          backgroundColor: '#7CADB9',
          width: '300px',
          marginBottom: '18px'
        }}
      >
        <img src="./github.svg" alt="Github" />
        <button>Sign Up With GitHub</button>
      </Link>
      <div style={{ fontWeight: 500, fontSize: '13px' }}>Already using TBox 16 ProMax</div>
      <div style={{ fontWeight: 'bold', textDecoration: 'underline', fontSize: '13px' }}>
        Sign in using Github
      </div>
    </div>
  )
}

export default Launch
