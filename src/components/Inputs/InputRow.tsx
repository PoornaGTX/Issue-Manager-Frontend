import { InputRowType } from '../../utils/types';

const InputRow = ({ type = 'text', labelText, name, value, handleChange, disabled, readonly }: InputRowType) => {
  return (
    <div className={`mb-3 ${type === 'date' && 'w-1/2'}`}>
      <label className="block mb-2">{labelText}</label>
      <input
        className={`block p-2 w-full rounded-lg  bg-gray-50 border border-gray-300 `}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        readOnly={readonly}
      />
    </div>
  );
};

export default InputRow;
