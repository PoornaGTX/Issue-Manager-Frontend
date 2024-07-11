import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { SingleValue } from 'react-select';
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
import { LoginFormRow, FormLogo, PasswordInput, LoginSelect } from '../components/';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, user } = useAppSelector((state) => state.Auth);
  const [showPassword, setShowPassword] = useState(false);
  const [isMember, setIsMember] = useState(false);
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name, company, position } = credentials;
    try {
      if (isMember) {
        LoginSchema.parse({ email, password });
        await dispatch(login({ email, password })).unwrap();
        toast.success('Login successful, Redirecting...');
      } else {
        RegisterSchema.parse({ email, password, name, company, position });
        await dispatch(register({ email, password, name, company, position })).unwrap();
        toast.success('Registration successful, Redirecting...');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
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
        <FormLogo isMember={isMember} />

        <LoginFormRow
          label="Name"
          htmlFor="name"
          type="text"
          id="email"
          name="name"
          isHidden={isMember}
          value={credentials.name}
          handleChange={handleChange}
          className="p-2 rounded-lg w-full bg-gray-50 border border-gray-300"
        />

        <LoginFormRow
          label="Email"
          htmlFor="email"
          type="text"
          id="email"
          name="email"
          value={credentials.email}
          handleChange={handleChange}
          className="p-2 rounded-lg w-full bg-gray-50 border border-gray-300"
        />

        <PasswordInput
          value={credentials.password}
          handleChange={handleChange}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />

        {!isMember && (
          <LoginSelect
            label="Position"
            htmlFor="Position"
            options={optionsPositions}
            value={selectedOptions.position}
            handleSelectChange={handleSelectChange('position')}
          />
        )}
        {!isMember && (
          <LoginSelect
            label="Company"
            htmlFor="company"
            options={options}
            value={selectedOptions.company}
            handleSelectChange={handleSelectChange('company')}
          />
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
