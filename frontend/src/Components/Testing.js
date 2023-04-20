import React, {useEffect, useState} from 'react';

function Testing() {
  const [count, setCount] = useState(1);
  //   useEffect(() => {
  //     console.log('this is our effect');
  //   }, []);

  useEffect(() => {
    console.log(`The current count is : ${count}`);
  }, [count]);

  function increaseCount() {
    setCount(current => current + 1);
  }
  function decreaseCount() {
    setCount(current => current - 1);
  }

  return (
    <div>
      <h1>The current count is : {count}</h1>
      <br />
      <button onClick={increaseCount}>Increase</button>
      <button onClick={decreaseCount}>Decrease</button>
    </div>
  );
}

export default Testing;
