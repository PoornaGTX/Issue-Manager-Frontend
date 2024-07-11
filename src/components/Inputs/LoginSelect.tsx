import Select from 'react-select';
import { loginSelect } from '../../utils/types';

const LoginSelect = ({ label, options, value, handleSelectChange, htmlFor }: loginSelect) => {
  return (
    <div className={`w-full ${label === 'Position' && 'mb-4'} `}>
      <label htmlFor="position" className="block mb-2">
        {label}
      </label>
      <Select options={options} value={value} onChange={handleSelectChange} />
    </div>
  );
};

export default LoginSelect;
