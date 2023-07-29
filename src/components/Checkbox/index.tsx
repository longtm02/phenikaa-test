import { FC } from "react";
import style from "./style.module.css";

interface ICheckboxProps {
  onChange: (checked: boolean, name?: string) => void;
  checked: boolean;
  name?: string;
}

const Checkbox: FC<ICheckboxProps> = ({ name, onChange, checked }) => {
  return (
    <div className={style.container}>
      <label className={style.switch}>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.checked, name)
          }
          checked={checked}
          type="checkbox"
          className={style.checkbox}
        />
        <span className={style.slider}></span>
      </label>
    </div>
  );
};

export default Checkbox;
