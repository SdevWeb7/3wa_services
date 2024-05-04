import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { IconClose } from "../svg/IconClose.jsx";
import { useAppStore } from "../utils/store.js";

export const MenuBurger = ({handleMenu}) => {
   const user = useAppStore.use.user();


   return createPortal(<nav className={'menu-burger'}>

       <IconClose onClick={handleMenu} />

       <Link onClick={handleMenu} className={'navlink'} to={'/'}>Home</Link>
       <Link onClick={handleMenu} className={'navlink'} to={'/about'}>Services</Link>


      {user && Object.keys(user).length > 0 && <Link onClick={handleMenu} className={'navlink'} to={'/about'}>Messagerie</Link>}

       <Link onClick={handleMenu} className={'navlink'} to={'/profil'}>Mon Compte</Link>


   </nav>, document.body)
}