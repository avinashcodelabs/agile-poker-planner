import { Item, Menu } from "react-contexify";

const CustomMenu = ({ menuId, handleOnClick }) => {
  return (
    <Menu id={menuId}>
      <Item onClick={handleOnClick}>Set as host</Item>
    </Menu>
  );
};

export { CustomMenu };
