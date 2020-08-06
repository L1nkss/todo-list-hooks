import "./style/style.scss";
import { TTodoItem } from "@components/app/app";
import TodoListItem from "@components/todo-list/components/todo-list.item";

interface ITodoList {
  todos: Array<TTodoItem>,
  changeItemStatus: (type: "important" | "done", id: number) => void,
  deleteItem: (id: number) => void
}

const createTodoItem = (item: TTodoItem, onClickCallback: (type: "important" | "done", id: number) => void, deleteItem: (id: number) => void) => {
  return (
    <TodoListItem
      key={item.id}
      item={item}
      onClickCallback={onClickCallback}
      deleteItem={deleteItem}
    />
  );
};

const TodoList = (props: ITodoList): JSX.Element => {
  return (
    <ul className="todo-list list-group">
      {props.todos.length !== 0
      && props.todos.map((el) => createTodoItem(el, props.changeItemStatus, props.deleteItem))}
      {props.todos.length === 0 && <li><h2 className="empty-todo-list">Список пуст.</h2></li>}
    </ul>
  );
};

export default TodoList;
