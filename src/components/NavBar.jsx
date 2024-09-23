import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { HiMenuAlt1 } from "react-icons/hi";
import { BiSolidCart } from 'react-icons/bi';
import { MdOutlineClose } from "react-icons/md";
import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/AppContext";
import LinkMenu from "./LinkMenu";

export const NavBar = ({ isTienda, isAdmin, isLogin }) => {
  const [open, setOpen] = useState(false);
  const { Logout, getCantidad } = useContext(Context);

  const navigate = useNavigate();
  const handleClic = (ancla) => {
    navigate('/');

    setTimeout(() => {
      const element = document.getElementById(ancla);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }, 0);
  };
  
  const handleCerrarSesion = () => {
    Logout()
    navigate('/');
  }

  return (
    <nav className="fixed z-40 w-full shadow-sm bg-claro">
      <div className="flex justify-between w-[95%] mx-auto px-2 py-3">
        <Icon
          onClick={() => setOpen(!open)}
          icon={<HiMenuAlt1 size={28} />}
          className="flex items-center lg:hidden"
          aria-label="Open menu"
        />

        <Logo url="/" />

        {/* Desktop Menu */}
        <ul className='z-50 items-center justify-start hidden w-1/3 gap-10 lg:flex 2xl:justify-center'>
          {isAdmin ? (
            <div className="flex justify-end w-full gap-8">
              <LinkMenu url="/admin/productos" isAncla={false}>productos</LinkMenu>
              <LinkMenu url="/admin/ventas" isAncla={false}>ventas</LinkMenu>
              <LinkMenu url="/admin/envios" isAncla={false}>envios</LinkMenu>
              <span className="text-xl font-semibold transition duration-150 ease-in-out cursor-pointer font-ebGaramond text-verde-200 hover:text-marron-200" onClick={handleCerrarSesion}>cerrar sesión</span>
            </div>
          ) : (
            <>
              <LinkMenu url="/" isAncla={false}>inicio</LinkMenu>
              {isTienda
                ?
                <a onClick={() => handleClic("nosotros")}
                  className="text-xl font-semibold transition duration-150 ease-in-out cursor-pointer font-ebGaramond text-marron-200 hover:text-verde-200"
                >nosotros</a>
                :
                <LinkMenu url="nosotros" isAncla={true}>nosotros</LinkMenu>
              }
              <LinkMenu url="/tienda" isAncla={false}>tienda</LinkMenu>
              {isTienda
                ?
                <a onClick={() => handleClic("contacto")}
                  className="text-xl font-semibold transition duration-150 ease-in-out cursor-pointer font-ebGaramond text-marron-200 hover:text-verde-200"
                >contacto</a>
                :
                <LinkMenu url="contacto" isAncla={true}>contacto</LinkMenu>
              }
            </>
          )}
        </ul>

        {/* Background menu */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        ></div>

        {/* Mobile Menu */}
        <ul className={`fixed z-50 w-full bg-claro h-screen lg:hidden flex flex-col gap-5 p-7 top-[-10px] duration-700 left-0 ${open ? 'top-12' : 'left-[-100%]'}`}>
          <li className='flex justify-between pb-2 border-b-[1.5px] border-marron-200'>
            <Logo url="/" onClick={() => setOpen(!open)} />

            <Icon
              onClick={() => setOpen(!open)}
              icon={<MdOutlineClose size={28} />}
              aria-label="Close menu"
            />
          </li>
          {isAdmin ? (
            <>
              <LinkMenu url="/admin/productos" onClick={() => setOpen(false)} isAncla={false}>productos</LinkMenu>
              <LinkMenu url="/admin/ventas" onClick={() => setOpen(false)} isAncla={false}>ventas</LinkMenu>
              <LinkMenu url="/admin/envios" onClick={() => setOpen(false)} isAncla={false}>envios</LinkMenu>
              <span className="text-xl font-semibold transition duration-150 ease-in-out cursor-pointer font-ebGaramond text-verde-200 hover:text-marron-200" onClick={handleCerrarSesion}>cerrar sesión</span>
            </>
          ) : (
            <>
              <LinkMenu url="/" onClick={() => setOpen(!open)} isAncla={false}>inicio</LinkMenu>
              <LinkMenu url="nosotros" onClick={() => { handleClic('nosotros'); setOpen(false); }} isAncla={true}>nosotros</LinkMenu>
              <LinkMenu url="/tienda" onClick={() => setOpen(!open)} isAncla={false}>tienda</LinkMenu>
              <LinkMenu url="contacto" onClick={() => { handleClic('contacto'); setOpen(false); }} isAncla={true}>contacto</LinkMenu>
            </>
          )}
        </ul>

        {/* Carrito */}
        {!isAdmin && (
          <div className="flex items-center">
            <Link to="/carrito" className="flex items-center gap-2">
              <Icon
                icon={<BiSolidCart size={28} />}
                aria-label="Open cart"
              />
              <span>{getCantidad()}</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
