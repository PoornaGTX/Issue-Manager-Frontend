import Logo from '../assets/logo.png';

const FormLogo = ({ isMember }: any) => {
  return (
    <div className="mb-2">
      <img src={Logo} alt="logo" />
      <h2 className="text-2xl text-center font-semibold mt-3">{isMember ? 'Login' : 'Register'}</h2>
    </div>
  );
};

export default FormLogo;
