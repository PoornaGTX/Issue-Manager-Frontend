import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { PasswordInputTypes } from '../../utils/types';

const PasswordInput = ({ value, handleChange, showPassword, togglePasswordVisibility }: PasswordInputTypes) => {
  return (
    <div className="mb-4 w-full">
      <label htmlFor="password" className="block mb-2">
        Password
      </label>
      <div className="flex justify-end items-center relative">
        <input
          id="password"
          name="password"
          value={value}
          onChange={handleChange}
          className="p-2 rounded-lg w-full bg-gray-50 border border-gray-300"
          type={showPassword ? 'text' : 'password'}
        />
        {showPassword ? (
          <AiFillEye className="absolute mr-2 w-10 cursor-pointer" onClick={togglePasswordVisibility} />
        ) : (
          <AiFillEyeInvisible className="absolute mr-2 w-10 cursor-pointer" onClick={togglePasswordVisibility} />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
