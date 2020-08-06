import AppHeader from "@components/app-header/app-header";
import TopPanel from "@components/top-panel/top-panel";
import TodoList from "@components/todo-list/todo-list";
import AddItemForm from "@components/add-item-form/add-item-form";
import { useState } from "react";

import "./style/style.scss";

const mockArray = [
  {
    label: "Попить", important: false, done: false, id: 100,
  },
];

type TTodos = Array<TTodoItem>;

export type TTodoItem = {
  label: string,
  important: boolean
  done: boolean,
  id: number
};

export type TFilters = "All" | "Active" | "Done";

const App: React.FC = () => {
  let idCount: number;
  const [todos, setTodos] = useState<TTodos>(mockArray);
  const [searchString, setSearchString] = useState<string>("");
  const [activeFilter, setFilter] = useState<TFilters>("All");
  idCount = 125;

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
    const newID = idCount++;
    console.log(newID);
    const item = {
      label: name, important: false, done: false, id: idCount++,
    };
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

    setTodos([...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)]);
  }

  function deleteItem(id: number): void {
    const idx: number = todos.findIndex((element) => element.id === id);

    setTodos([...todos.slice(0, idx), ...todos.slice(idx + 1)]);
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
