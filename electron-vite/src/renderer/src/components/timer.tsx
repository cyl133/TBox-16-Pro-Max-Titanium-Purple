import React, { useState, useEffect } from 'react';

const Timer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let interval;

    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>{seconds} seconds remaining</p>
    </div>
  );
};

export default Timer;
