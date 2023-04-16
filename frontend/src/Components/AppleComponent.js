import React, {useState} from 'react'

function AppleComponent() {
  const [numberOfApple, setNumberOfApple] = useState(0)

  function AppleDisplay(numberOfApple){
    if(numberOfApple === 0 || numberOfApple === 1){
      return `John has ${numberOfApple} apple`;
    } else if(numberOfApple > 1){
      return `John has ${numberOfApple} apples`;
    } else if(numberOfApple === -1){
      return `John owe us ${Math.abs(numberOfApple)} apple`;
    } else {
      return `John owe us ${Math.abs(numberOfApple)} apples`;
    }
  }

  function IncreaseApple(){
    setNumberOfApple((currentValue)=> currentValue + 1)
  }

  function DecreaseApple(){
    setNumberOfApple((currentValue)=> currentValue - 1)
  }

  function TooManyDisplay(){
    if(numberOfApple > 10){
      return <b>John has too many apples</b>
    } else{
      return ''
    }
  }

  return (
    <div>
      <h1>Hello World!</h1>
      <p>{AppleDisplay(numberOfApple)}</p>
      <div>
        <button onClick={IncreaseApple} className='add-btn'>Increase</button>
        <button onClick={DecreaseApple} style={{display: numberOfApple < -3 ? 'None' : ''}} className='decrease-btn'>Decrease</button>
      </div>
      {/* {TooManyDisplay()} */}
      {numberOfApple > 10 ? <b>John has too many apples</b> : ''}
    </div>
  );
}

export default AppleComponent