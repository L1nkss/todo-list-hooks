import "./style/style.scss";
import { TFilters } from "@components/app/app";

interface ITopPanel {
  changeFilterStatus: (type: TFilters) => void,
  activeButton: TFilters,
  changeSearchString: (name: string) => void
}

  type TFilterButtons = {
    name: string,
    label: TFilters
  };

const FILTERS_BUTTONS: Array<TFilterButtons> = [
  { name: "Все", label: "All" },
  { name: "Активные", label: "Active" },
  { name: "Выполненные", label: "Done" },
];

const createFilterButtons = (active: TFilters, onClickCallback: (type: TFilters) => void): Array<JSX.Element> => {
  return FILTERS_BUTTONS.map((button) => {
    const className = active === button.label ? "button--active" : "button--grey";

    return (
      <button
        key={button.label}
        onClick={() => onClickCallback(button.label)}
        type="button"
        className={`button ${className}`}
      >
        {button.name}
      </button>
    );
  });
};

const TopPanel = (props: ITopPanel): React.ReactElement => {
  const buttons = createFilterButtons(props.activeButton, props.changeFilterStatus);
  return (
    <div className="top-panel">
      <input type="text" placeholder="Поиск..." className="input" onChange={(evt) => props.changeSearchString(evt.target.value)} />
      <div className="button-group">
        {buttons}
      </div>
    </div>
  );
};

export default TopPanel;
