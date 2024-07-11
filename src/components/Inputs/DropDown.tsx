import { DropDownType } from '../../utils/types';
import Select from 'react-select';

const DropDown = ({ htmlFor, labelText, options, value, handleSelectChange, isDisabled }: DropDownType) => {
  return (
    <div className="mb-3 w-1/2">
      <label htmlFor={htmlFor} className="block mb-2">
        {labelText}
      </label>
      <Select options={options} value={value} onChange={handleSelectChange} isDisabled={isDisabled} />
    </div>
  );
};

export default DropDown;
