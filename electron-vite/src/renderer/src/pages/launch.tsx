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
          paddingBottom: '17px',
          color: 'black',
          textAlign: 'center'
        }}
      >
        TBox 16 Pro Max
      </h1>
      <div style={{ paddingBottom: '52px', alignItems: 'center', textAlign: 'center' }}>
        Our TBox 16 Pro Max (titanium purple) applies LLMs to solve time boxing and time estimation{' '}
      </div>
      <Link
        to="/gettingStarted"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '49px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          backgroundColor: '#7CADB9',
          width: '300px',
          marginBottom: '18px',
          textDecoration: 'none',  // Removes the underline from the link
          border: 'none',
          borderRadius: '4px'  // Optional: to give it a rounded button look
        }}
      >
        Sign Up With GitHub
        
      </Link>

      <div style={{ fontWeight: 500, fontSize: '13px' }}>Already using TBox 16 ProMax</div>
      <div style={{ fontWeight: 'bold', textDecoration: 'underline', fontSize: '13px' }}>
        Sign in using Github
      </div>
    </div>
  )
}

export default Launch
