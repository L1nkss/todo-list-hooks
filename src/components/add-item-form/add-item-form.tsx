import "./style/style.scss";

interface IAddItemFormProps {
  addItem: (name: string) => void
}

interface IAddItemFormState {
  name: string | ""
}

export default class AddItemForm extends React.Component<IAddItemFormProps, IAddItemFormState> {
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: IAddItemFormProps) {
    super(props);
    this.state = {
      name: "",
    };
    this.inputRef = React.createRef();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(evt: React.FormEvent<HTMLInputElement>) {
    this.setState({ name: evt.currentTarget.value });
  }

  handleButtonClick(evt: React.FormEvent): void {
    evt.preventDefault();
    const { name } = this.state;
    if (name !== "") {
      this.props.addItem(name);
      this.setState({ name: "" });
    }
  }

  render() {
    return (
      <form className="add-item-form" onSubmit={this.handleButtonClick}>
        <input onChange={this.handleNameChange} type="text" placeholder="Что нужно сделать?" className="input" value={this.state.name} />
        <button type="submit" className="button button--grey">Добавить</button>
      </form>
    );
  }
}
