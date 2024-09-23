/* eslint-disable react/prop-types */
import { Link as LinkAncla } from "react-scroll";
import { Link } from "react-router-dom";

const LinkMenu = ({ isAncla, children, url, onClick, ...props }) => {
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <>
      {isAncla ? (
        <LinkAncla
          to={url}
          className="text-xl font-semibold transition duration-150 ease-in-out cursor-pointer font-ebGaramond text-marron-200 hover:text-verde-200"
          smooth={true}
          duration={1000}
          onClick={handleClick}
          {...props}
        >
          {children}
        </LinkAncla>
      ) : (
        <Link
          to={url}
          className="text-xl font-semibold transition duration-150 ease-in-out cursor-pointer font-ebGaramond text-marron-200 hover:text-verde-200"
          onClick={handleClick}
          {...props}
        >
          {children}
        </Link>
      )}
    </>
  );
};

export default LinkMenu;
