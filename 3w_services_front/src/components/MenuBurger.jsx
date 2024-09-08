import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { IconClose } from "../svg/IconClose.jsx";
import { useContext } from "react";
import { myContext } from "../hooks/MyContextProvider.jsx";


export const MenuBurger = ({handleMenu}) => {
   const {user} = useContext(myContext);


   return createPortal(<nav className={'menu-burger'}>

       <IconClose
          aria-label={'Fermer le menu'}
          onClick={handleMenu} />

       <Link onClick={handleMenu} className={'navlink'} to={'/'}>Home</Link>
       <Link onClick={handleMenu} className={'navlink'} to={'/services'}>Services</Link>

       <Link onClick={handleMenu} className={'navlink'} to={'/profil'}>Profil</Link>

      {user && user.role === 'admin' && <Link
         className={'navlink'}
         to="/admin">Admin</Link>}


   </nav>, document.body)
}