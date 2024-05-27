import React, { useReducer } from 'react';

const SET_PLUS = 'SET_PLUS';
const SET_MINUS = 'SET_MINUS';

const initialState = {
  sum: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PLUS: {
      return {
        ...state,
        sum: state.sum + 1,
      };
    }
    case SET_MINUS: {
      if (state.sum <= 0) {
        return state; // sum이 0 이하이면 상태를 변경하지 않음
      }
      return {
        ...state,
        sum: state.sum - 1,
      };
    }
    default:
      return state;
  }
};

const Count = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onClickPlus = () => {
    dispatch({ type: SET_PLUS });
  };

  const onClickMinus = () => {
    dispatch({ type: SET_MINUS });
  };

  return (
    <>
      <div>Sum: {state.sum} 입니다.</div>
      <button onClick={onClickPlus}>+버튼</button>
      <button onClick={onClickMinus}>-버튼</button>
    </>
  );
};

export default Count;
