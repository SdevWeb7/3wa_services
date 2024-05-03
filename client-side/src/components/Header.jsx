import { Link } from "react-router-dom";
import { IconBurger } from "../svg/IconBurger.jsx";
import { useState } from "react";
import { MenuBurger } from "./MenuBurger.jsx";

export const Header = () => {

   const [isOpenMenu, setIsOpenMenu] = useState(false);

   const handleMenu = () => {
      setIsOpenMenu(v => !v);
   }

   return <>

       <header className={'header'}>
          <Link className={'logo'} to={'/'}>Community-Services</Link>

           <nav className={'navbar'}>
               <Link className={'navlink'} to="/about">Services</Link>
               <Link className={'navlink'} to="/about">Messagerie</Link>

           </nav>
            <Link className={"navlink btn btn-tertiary"} to="/profil">Mon compte</Link>

           <Link className="burger btn">
              <IconBurger onClick={handleMenu} />
           </Link>

            {isOpenMenu && <MenuBurger handleMenu={handleMenu} />}
       </header>
   </>

}