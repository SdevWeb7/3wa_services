import { Link } from "react-router-dom";
import { IconBurger } from "../svg/IconBurger.jsx";
import { useContext, useState } from "react";
import { MenuBurger } from "./MenuBurger.jsx";
import { myContext } from "../hooks/MyContextProvider.jsx";

export const Header = () => {
   const {user} = useContext(myContext);
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

              {user && user.role === 'admin' && <Link
                  className={'navlink'}
                  to="/admin">Admin</Link>}
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