import { useState } from "react";
import "./style/style.scss";

interface IAddItemFormProps {
  addItem: (name: string) => void
}

const AddItemForm:React.FC<IAddItemFormProps> = (props: IAddItemFormProps) => {
  const [name, setName] = useState<string>("");

  function handleNameChange(evt: React.FormEvent<HTMLInputElement>): void {
    setName(evt.currentTarget.value);
  }

  function handleButtonClick(evt: React.FormEvent): void {
    evt.preventDefault();
    if (name !== "") {
      props.addItem(name);
      setName("");
    }
  }
  return (
    <form className="add-item-form" onSubmit={handleButtonClick}>
      <input onChange={handleNameChange} type="text" placeholder="Что нужно сделать?" className="input" value={name} />
      <button type="submit" className="button button--grey">Добавить</button>
    </form>
  );
};

export default AddItemForm;
