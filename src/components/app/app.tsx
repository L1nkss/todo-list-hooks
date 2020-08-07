import AppHeader from "@components/app-header/app-header";
import TopPanel from "@components/top-panel/top-panel";
import TodoList from "@components/todo-list/todo-list";
import AddItemForm from "@components/add-item-form/add-item-form";
import { useState, useEffect } from "react";

import "./style/style.scss";

type TTodos = Array<TTodoItem>;

export type TTodoItem = {
  label: string,
  important: boolean
  done: boolean,
  id: number
};

export type TFilters = "All" | "Active" | "Done";

const App: React.FC = () => {
  const [todos, setTodos] = useState<TTodos>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [activeFilter, setFilter] = useState<TFilters>("All");

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");

    setTodos(JSON.parse(localTodos));
  }, []);

  function getFilteredItems(): Array<TTodoItem> {
    const filter: string = activeFilter;

    switch (filter) {
      case "Active":
        return todos.filter((item) => !item.done);
      case "Done":
        return todos.filter((item) => item.done);
      default:
        return todos;
    }
  }

  function addItem(name: string): void {
    const item = {
      label: name, important: false, done: false, id: Date.now(),
    };
    localStorage.setItem("todos", JSON.stringify([...todos, item]));
    setTodos([...todos, item]);
  }

  function changeSearchString(label: string): void {
    setSearchString(label);
  }

  function searchItems(name: string, items: Array<TTodoItem>): Array<TTodoItem> {
    if (name === "") {
      return items;
    }

    return items.filter((element) => {
      const targetValue = name.toLocaleLowerCase();

      return element.label.includes(targetValue);
    });
  }

  function changeFilterStatus(type: TFilters): void {
    setFilter(type);
  }

  function changeItemStatus(type: "important" | "done", id: number): void {
    const idx: number = todos.findIndex((element) => element.id === id);
    const newItem: TTodoItem = { ...todos[idx], [type]: !todos[idx][type] };
    const newTodos = [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)];

    localStorage.setItem("todos", JSON.stringify(newTodos));

    setTodos(newTodos);
  }

  function deleteItem(id: number): void {
    const idx: number = todos.findIndex((element) => element.id === id);
    const newTodo = [...todos.slice(0, idx), ...todos.slice(idx + 1)];

    localStorage.setItem("todos", JSON.stringify(newTodo));

    setTodos(newTodo);
  }

  const doneItems: number = todos.filter((element) => element.done).length;
  const activeItems: number = todos.length - doneItems;
  const itemsToShow: Array<TTodoItem> = searchItems(searchString, getFilteredItems());

  return (
    <div className="app">
      <AppHeader done={doneItems} active={activeItems} />
      <TopPanel
        changeFilterStatus={changeFilterStatus}
        activeButton={activeFilter}
        changeSearchString={changeSearchString}
      />
      <TodoList
        todos={itemsToShow}
        changeItemStatus={changeItemStatus}
        deleteItem={deleteItem}
      />
      <AddItemForm addItem={addItem} />
    </div>
  );
};

export default App;
