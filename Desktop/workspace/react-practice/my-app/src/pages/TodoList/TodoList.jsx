import React, { useReducer, useRef } from 'react';
import styles from './TodoList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faSquarePlus,
  faTrashCan,
  faSquareCheck,
  faSquareMinus,
} from '@fortawesome/free-regular-svg-icons';

const initialState = {
  count: '',
  inputValue: '',
  todos: [],
  deleteBTN: false,
  doneTodos: [],
};

const CHANGE_INPUT = 'CHANGE_INPUT';
const CREATE_TODO = 'CREATE_TODO';
const DELETE_BTN_ALL = 'DELETE_BTN_ALL';
const DELETE_BTN = 'DELETE_BTN';
const MOVE_BTN = 'MOVE_BTN';

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        inputValue: action.payload,
      };

    case CREATE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: state.todos.length + 1, text: action.payload },
        ],
        inputValue: '',
        deleteBTN: true,
        count: state.count + 1,
      };

    case DELETE_BTN_ALL:
      return {
        ...state,
        todos: [],
        doneTodos: [],
        count: 0,
        inputValue: '',
      };

    case DELETE_BTN:
      return {
        ...state,
        doneTodos: state.doneTodos.filter((todo) => todo.id !== action.payload),
        count: state.count - 1,
      };

    case MOVE_BTN:
      const moveTodo = state.todos.find((todo) => todo.id === action.payload);
      if (moveTodo) {
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload),
          doneTodos: [...state.doneTodos, moveTodo],
        };
      }
      return state;

    default:
      return state;
  }
};

const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);

  const onClickSub = () => {
    if (!state.inputValue) {
      return;
    }
    dispatch({ type: CREATE_TODO, payload: state.inputValue });
    inputRef.current.focus();
  };

  const onChangeInput = (e) => {
    dispatch({ type: CHANGE_INPUT, payload: e.target.value });
  };

  const onDeleteBtnAll = () => {
    dispatch({ type: DELETE_BTN_ALL });
    inputRef.current.focus();
  };

  const onDeleteBtn = (id) => {
    dispatch({ type: DELETE_BTN, payload: id });
  };

  const moveDone = (id) => {
    dispatch({ type: MOVE_BTN, payload: id });
  };

  return (
    <>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>TO DO YOUR LIFE : {state.count}</h1>

          <div className={styles.container}>
            <input
              ref={inputRef}
              onChange={onChangeInput}
              value={state.inputValue}
              type="text"
              className={styles.inputField}
            />
            <button
              onClick={onClickSub}
              type="button"
              className={styles.plusBtn}
            >
              <FontAwesomeIcon icon={faSquarePlus} />
            </button>
            <button
              onClick={onDeleteBtnAll}
              type="button"
              className={styles.deleteBtnAll}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>

        <section className={styles.todoList}>
          <div className={styles.section}>
            <h1>Active</h1>
            <ul className={styles.activeList}>
              {state.todos.map((todo) => (
                <li key={todo.id}>
                  {todo.text}
                  <button
                    onClick={() => moveDone(todo.id)}
                    type="button"
                    className={styles.doneBtn}
                  >
                    <FontAwesomeIcon icon={faSquareCheck} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h1>Done</h1>
            <ul className={styles.doneList}>
              {state.doneTodos.map((todo) => (
                <li key={todo.id}>
                  {todo.text}
                  <button
                    onClick={() => onDeleteBtn(todo.id)}
                    type="button"
                    className={styles.deleteBtn}
                  >
                    <FontAwesomeIcon icon={faSquareMinus} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default TodoList;
