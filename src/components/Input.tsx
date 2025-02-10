import { Dispatch, SetStateAction } from "react";

interface InputProps {
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: Dispatch<SetStateAction<any>>;
}

export const Input: React.FC<InputProps> = ({ value, setValue }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      className="border border-gray-200 rounded-md p-2 text-white focus:outline-none"
    />
  );
};
