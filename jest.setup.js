import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

window.React = require("react");
window.shallow = Enzyme.shallow;
window.mount = Enzyme.mount;

Enzyme.configure({adapter: new Adapter()});