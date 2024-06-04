import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { IconClose } from "../svg/IconClose.jsx";


export const MenuBurger = ({handleMenu}) => {


   return createPortal(<nav className={'menu-burger'}>

       <IconClose
          aria-label={'Fermer le menu'}
          onClick={handleMenu} />

       <Link onClick={handleMenu} className={'navlink'} to={'/'}>Home</Link>
       <Link onClick={handleMenu} className={'navlink'} to={'/services'}>Services</Link>

       <Link onClick={handleMenu} className={'navlink'} to={'/profil'}>Profil</Link>


   </nav>, document.body)
}