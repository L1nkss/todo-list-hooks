import "./style/style.scss";

interface IAppHeader {
  done: number,
  active: number
}

const AppHeader = (props: IAppHeader): React.ReactElement => {
  return (
    <div className="app-header">
      <h1 className="app-header__title">Todo List</h1>
      <h2 className="app-header__task-count">{`${props.active} осталось, ${props.done} выполнен`}</h2>
    </div>
  );
};

export default AppHeader;
