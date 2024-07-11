import { InputRowMultiLine } from '../../utils/types';

const InputMultiLine = ({ labelText, name, value, handleChange, disabled }: InputRowMultiLine) => {
  return (
    <div className="mb-3">
      <label className="block mb-2">{labelText}</label>
      <textarea
        className="block p-2 w-full rounded-lg  bg-gray-50 border border-gray-300 h-24"
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};

export default InputMultiLine;
