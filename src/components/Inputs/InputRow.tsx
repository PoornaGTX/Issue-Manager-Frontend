import { InputRowType } from '../../utils/types';
import { toast } from 'react-toastify';

const InputRow = ({ type = 'text', labelText, name, value, handleChange, disabled, readonly }: InputRowType) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();

    if (selectedDate < today) {
      e.preventDefault();
      toast.error('Please select a future date.');
      return;
    }

    handleChange(e);
  };

  return (
    <div className={`mb-3 ${type === 'date' && 'w-1/2'}`}>
      <label className="block mb-2">{labelText}</label>
      <input
        className={`block p-2 w-full rounded-lg  bg-gray-50 border border-gray-300 `}
        type={type}
        name={name}
        value={value}
        onChange={type === 'date' ? handleDateChange : handleChange}
        disabled={disabled}
        readOnly={readonly}
      />
    </div>
  );
};

export default InputRow;
