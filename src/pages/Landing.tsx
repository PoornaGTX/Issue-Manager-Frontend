import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import LandingImg from '../assets/main.svg';

export const Landing = () => {
  const navigate = useNavigate();

  const buttonHandler = () => {
    navigate('/login');
  };

  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <img src={Logo} alt="Logo" />
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-6xl font-bold">
            Issue <span className="text-primary">Manager</span> App
          </h1>
          <p className="max-w-md mt-4 font-semibold text-justify">
            Issue Manager is your comprehensive solution for tracking and managing issues effectively. With Issue Manager, you can effortlessly create
            new issues, specifying essential details like title, description, and optional fields such as severity and priority. Stay organized by
            viewing a consolidated list of all issues, and delve into the specifics of any individual issue with our detailed view. Easily edit and
            update issue information, and seamlessly mark issues as resolved or closed.
          </p>

          <button className="mt-4 bg-black p-3 text-white rounded-lg" onClick={buttonHandler}>
            Get Started
          </button>
        </div>

        <img src={LandingImg} alt="Landing" className="hidden lg:block" />
      </section>
    </main>
  );
};
