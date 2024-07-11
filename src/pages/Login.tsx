import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Logo from '../assets/logo.png';
import Select, { SingleValue } from 'react-select';
import { OptionType } from '../utils/types';
import { useAppSelector, useAppDispatch } from '../hooks/useAppHook';
import { useNavigate } from 'react-router-dom';
import { RegisterSchema, LoginSchema } from '../schema/RegisterSchema';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { register, login } from '../features/user/AuthSlice';
import PropagateLoader from 'react-spinners/PulseLoader';
import { override } from '../utils/consts';
import { options, optionsPositions } from '../utils/consts';
import { AxiosError } from 'axios';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, user, showAlert, alertText, alertType } = useAppSelector((state) => state.Auth);
  const [showPassword, setShowPassword] = useState(false);
  const [isMember, setIsMember] = useState(false);
  // const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [credentials, setCredentials] = useState({ name: '', email: '', company: '', position: '', password: '' });

  const [selectedOptions, setSelectedOptions] = useState<{ company: OptionType | null; position: OptionType | null }>({
    company: null,
    position: null,
  });

  const handleSelectChange = (key: keyof typeof selectedOptions) => (selectedOption: SingleValue<OptionType>) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [key]: selectedOption,
    }));
    setCredentials((prevFormData) => ({
      ...prevFormData,
      [key]: selectedOption?.value ?? '',
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleMember = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMember(!isMember);
  };

  // const handleSelectChange = (selectedOption: SingleValue<OptionType>) => {
  //   setSelectedOption(selectedOption);
  //   const companyValue = selectedOption?.value ?? '';
  //   setCredentials((prevState) => ({
  //     ...prevState,
  //     company: companyValue,
  //   }));
  // };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  interface ErrorResponse {
    error: string;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name, company, position } = credentials;
    try {
      if (isMember) {
        LoginSchema.parse({ email, password });
        await dispatch(login({ email, password })).unwrap();
        toast.success('login successful, redirecting...');
      } else {
        RegisterSchema.parse({ email, password, name, company, position });
        await dispatch(register({ email, password, name, company, position })).unwrap();
        toast.success('register successful, redirecting...');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        // console.log('error axios');
        // const axiosError = error as AxiosError<ErrorResponse>;
        // const errorMessage = axiosError.response?.data.error ?? 'An error occurred';
        // toast.error(alertText);
        const errorMessage = error as string;
        toast.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col border items-center bg-white p-6 rounded-lg  min-w-[350px] sm:min-w-[400px] shadow-2xl" onSubmit={handleSubmit}>
        <div className="mb-2">
          <img src={Logo} alt="logo" />
          <h2 className="text-2xl text-center font-semibold mt-3">{isMember ? 'Login' : 'Register'}</h2>
        </div>

        <div className={`${isMember ? 'hidden' : 'block'} mb-4 w-full`}>
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            className="p-2 rounded-lg w-full bg-gray-50 border border-gray-300"
            type="text"
          />
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="p-2 rounded-lg w-full bg-gray-50 border border-gray-300"
            type="text"
          />
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <div className="flex justify-end items-center relative">
            <input
              id="password"
              name="password"
              value={credentials.password}
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
        {!isMember && (
          <div className="w-full mb-4">
            <label htmlFor="position" className="block mb-2">
              Position
            </label>
            <Select options={optionsPositions} value={selectedOptions.position} onChange={handleSelectChange('position')} />
          </div>
        )}

        {!isMember && (
          <div className="w-full">
            <label htmlFor="company" className="block mb-2">
              Company
            </label>
            <Select options={options} value={selectedOptions.company} onChange={handleSelectChange('company')} />
          </div>
        )}

        <button className="bg-primary text-white text-xl font-semibold w-full rounded-md mt-4 p-1">
          {isLoading ? (
            <PropagateLoader color={'white'} loading={isLoading} cssOverride={override} size={5} aria-label="Loading Spinner" data-testid="loader" />
          ) : (
            `${isMember ? 'Login' : 'Register'}`
          )}
        </button>

        <div className="mt-4">
          <h2 className="text-lg">
            {!isMember ? 'Already a member?' : 'Not a member yet?'}
            <span>
              <a className="text-primary font-semibold" href="" onClick={toggleMember}>
                {' '}
                {!isMember ? 'Login' : 'Register'}
              </a>
            </span>
          </h2>
        </div>
      </form>
    </div>
  );
};

export default Login;
