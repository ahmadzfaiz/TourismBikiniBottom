import React, {useEffect, useState, useReducer} from 'react';
import {useImmerReducer} from 'use-immer';

function Testing() {
  const initialState = {
    appleCount: 1,
    bananaCount: 10,
    message: 'hello',
    happy: false,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case 'addApple':
        draft.appleCount += 1;
        break;
      case 'changeEverything':
        draft.bananaCount += 10;
        draft.message = action.customMessage;
        draft.happy = true;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  return (
    <div>
      <div>Now the count of apple is {state.appleCount}</div>
      <div>Now the count of banana is {state.bananaCount}</div>
      <div>Message: {state.message}</div>
      <div>Is happy: {state.happy ? 'yes' : 'no'}</div>
      <br />
      <button onClick={() => dispatch({type: 'addApple'})}>Add Apple</button>
      <button
        onClick={() =>
          dispatch({
            type: 'changeEverything',
            customMessage: 'this message come from dispatch',
          })
        }
      >
        CHANGE ALL
      </button>
    </div>
  );
}

export default Testing;
