import React from "react";

interface IOptions {
  label: string | number;
  value: string | number;
}

interface ISelect {
  options: IOptions[];
}

const Select: React.FC<ISelect> = ({ options }) => {
  return (
    <select
      onChange={(e) => {
      }}
      className="bg-white border px-6 py-3"
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
