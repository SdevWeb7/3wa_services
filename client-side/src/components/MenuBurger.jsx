import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { IconClose } from "../svg/IconClose.jsx";

export const MenuBurger = ({handleMenu}) => {


   return createPortal(<nav className={'menu-burger'}>

       <IconClose onClick={handleMenu} />

       <Link onClick={handleMenu} className={'navlink'} to={'/'}>Home</Link>
       <Link onClick={handleMenu} className={'navlink'} to={'/about'}>Services</Link>
       <Link onClick={handleMenu} className={'navlink'} to={'/about'}>Messagerie</Link>
       <Link onClick={handleMenu} className={'navlink'} to={'/auth'}>Mon Compte</Link>

   </nav>, document.body)
}