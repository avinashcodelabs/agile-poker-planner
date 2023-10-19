import { Menu, Item } from "react-contexify";

const CustomMenu = ({ menuId, handleOnClick }) => {
  return (
    <Menu id={menuId}>
      <Item onClick={handleOnClick}>Make Host</Item>
    </Menu>
  );
};

export { CustomMenu };
