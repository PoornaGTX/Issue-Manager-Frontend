import { useState, PropsWithChildren } from 'react';
import { links, Mobilelinks } from '../utils/links';
import { Link } from 'react-router-dom';
import { BsBellFill, BsBoxArrowRight } from 'react-icons/bs';
import { APP_NAME, LOG_OUT } from '../utils/consts';
import Logo from '../assets/logo.png';
import { useAppSelector, useAppDispatch } from '../hooks/useAppHook';
import { logOut } from '../features/user/AuthSlice';
import { TiArrowSortedDown } from 'react-icons/ti';

const NavBar = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const [userDropDownOpen, setUserDropDownOpen] = useState(false);

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.Auth);

  const sideBarClose = () => {
    setOpen(false);
    setUserDropDownOpen(false);
  };

  return (
    <div className={`flex h-screen bg-gray-100  `}>
      <div
        className={`hidden sm:transition-all sm:flex flex-col w-64 bg-gray-200 ${
          open ? 'sm:transform sm:translate-x-0 sm:overflow-y-auto' : 'sm:transform sm:-translate-x-full'
        } sm:ease-in-out sm:duration-300 sm:fixed sm:h-screen`}
      >
        <div className="mx-auto mt-2">
          <img src={Logo} alt="logo" />
        </div>
        <div className="flex flex-col flex-1 mt-12">
          {links.map((link) => (
            <div key={link.id}>
              <nav className="flex-1 px-8 mb-5">
                <Link
                  to={link.path}
                  key={link.id}
                  className="flex gap-5 items-center px-4 py-2 text-primary hover:bg-gray-400 hover:text-white"
                  onClick={() => setOpen(!open)}
                >
                  <span>{link.icon}</span>
                  <span className="text-xl font-bold">{link.text}</span>
                </Link>
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* <!-- Main content --> */}
      <div className={`flex flex-col flex-1 overflow-y-auto ${open ? 'sm:ml-64' : ''} duration-300`}>
        <div className="flex items-center justify-between bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center px-4  h-16 relative">
            <button className="text-gray-500 focus:outline-none focus:text-gray-700 z-10" onClick={() => setOpen(!open)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className=" text-gray-800 ml-5 font-bold text-xs sm:text-md md:text-xl">{APP_NAME}</h2>

            {/* mobile menu */}
            {open && (
              <div className="sm:hidden fixed z-20 inset-0 bg-black bg-opacity-25  backdrop-blur-sm flex justify-center items-center text-slate-950 overflow-y-hidden">
                <div className="sm:hidden absolute w-60 h-auto bg-gray-800 top-20 py-1 rounded-lg">
                  <div>
                    <div className="text-white text-xl flex justify-end mr-3 cursor-pointer" onClick={() => setOpen(!open)}>
                      X
                    </div>
                    <nav className="flex-1 jus px-2  bg-gray-800">
                      {Mobilelinks.map((link) => (
                        <Link
                          to={link.path}
                          key={link.id}
                          className="flex gap-5 items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
                          onClick={() => setOpen(!open)}
                        >
                          <span>{link.icon}</span>
                          {link.text}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center pr-4">
            <div className="flex justify-between items-center gap-4">
              <div className="relative">
                <button
                  className="flex items-center text-xs sm:text-md md:text-xl text-gray-800 ml-5 font-bold capitalize"
                  onClick={() => setUserDropDownOpen(!userDropDownOpen)}
                >
                  <span>{user.name}</span>
                  <TiArrowSortedDown className="ml-1" />
                </button>
                {userDropDownOpen && (
                  <div className="absolute top-9 right-1 w-36 h-auto bg-slate-200 p-4 overflow-hidden rounded-md flex justify-center">
                    <button className="text-black flex flex-row items-center justify-center gap-x-2" onClick={() => dispatch(logOut())}>
                      <BsBoxArrowRight size={20} />
                      <span className="font-bold">{LOG_OUT}</span>
                    </button>
                  </div>
                )}
              </div>

              <BsBellFill size={20} />
            </div>
          </div>
        </div>
        <div className="p-4" onClick={sideBarClose}>
          <div className="p-4  z-0"> {children}</div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
