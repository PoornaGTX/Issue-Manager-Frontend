import { LoginInputTypes } from '../../utils/types';

const LoginFormRow = ({ label, id, value, name, isHidden, handleChange, type, htmlFor }: LoginInputTypes) => {
  return (
    <div className={`${isHidden ? 'hidden' : 'block'} mb-4 w-full`}>
      <label htmlFor={htmlFor} className="block mb-2">
        {label}
      </label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        className="p-2 rounded-lg w-full bg-gray-50 border border-gray-300"
        type={type}
      />
    </div>
  );
};

export default LoginFormRow;
