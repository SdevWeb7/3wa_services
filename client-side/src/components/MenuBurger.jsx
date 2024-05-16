import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { IconClose } from "../svg/IconClose.jsx";
import { useContext } from "react";
import { myContext } from "../hooks/MyContextProvider.jsx";

export const MenuBurger = ({handleMenu}) => {
   const { user } = useContext(myContext);


   return createPortal(<nav className={'menu-burger'}>

       <IconClose onClick={handleMenu} />

       <Link onClick={handleMenu} className={'navlink'} to={'/'}>Home</Link>
       <Link onClick={handleMenu} className={'navlink'} to={'/about'}>Services</Link>


      {user && Object.keys(user).length > 0 && <Link onClick={handleMenu} className={'navlink'} to={'/about'}>Messagerie</Link>}

       <Link onClick={handleMenu} className={'navlink'} to={'/profil'}>Mon Compte</Link>


   </nav>, document.body)
}