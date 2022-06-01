import logo from './logo.svg'
import './App.css'
import { Dispatch, useCallback } from 'react';
import { ID, Todo } from './components/TodoList/typing';
import { addTodo, IAddTodoAction, removeTodo, toggleTodoStatus } from './components/TodoList/actions';
import Input from './components/TodoList/Input';
import List from './components/TodoList/List';
interface IProps {
  dispatch: Dispatch<IAddTodoAction>;
}


function App() {
  const handleAddTodo = useCallback((todo: Todo) => {
    addTodo(todo)(dispatch);
  }, []);

  const handleRemoveList = useCallback(
    (id: ID) => () => {
      removeTodo(id)(dispatch);
    },
    []
  );

  const handleToggleListStatus = useCallback(
    (id: ID) => () => {
      toggleTodoStatus(id)(dispatch);
    },
    []
  );
  return (
    <div className="App">
      <Input onAddTodo={handleAddTodo} />
<List
     todoList={todoList}
     onRemoveList={handleRemoveList}
     onToggleListStatus={handleToggleListStatus}
   />
    </div>
  )
}

export default App
