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
      <header>
       <nav className={'header'}>
          <Link
             title={'Accueil du site'}
             className={'logo'}
             to={'/'}>Community-Services</Link>

           <div className={'navbar'}>
               <Link
                  className={'navlink'}
                  to="/services">Tous les services</Link>
           </div>
            <Link
               className={"navlink btn btn-tertiary"}
               to="/profil">Profil</Link>

           <Link
              aria-haspopup={'menu'}
              aria-expanded={isOpenMenu}
              aria-label={"Ouvrir le menu de navigation"}
              className="burger btn"
              onClick={handleMenu}>
              <IconBurger />
           </Link>

            {isOpenMenu && <MenuBurger handleMenu={handleMenu} />}
       </nav>
      </header>
   </>

}