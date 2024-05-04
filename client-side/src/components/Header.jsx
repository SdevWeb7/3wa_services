import { Link } from "react-router-dom";
import { IconBurger } from "../svg/IconBurger.jsx";
import { useState } from "react";
import { MenuBurger } from "./MenuBurger.jsx";
import { useAppStore } from "../utils/store.js";

export const Header = () => {
   const user = useAppStore.use.user();
   const [isOpenMenu, setIsOpenMenu] = useState(false);

   const handleMenu = (e) => {
      e.preventDefault();
      setIsOpenMenu(v => !v);
   }

   return <>

       <header className={'header'}>
          <Link className={'logo'} to={'/'}>Community-Services</Link>

           <nav className={'navbar'}>
               <Link className={'navlink'} to="/about">Services</Link>

              {user && Object.keys(user).length > 0 && <Link className={'navlink'} to="/about">Messagerie</Link>}

           </nav>
            <Link className={"navlink btn btn-tertiary"} to="/profil">Mon compte</Link>

           <Link className="burger btn" onClick={e => handleMenu(e)}>
              <IconBurger />
           </Link>

            {isOpenMenu && <MenuBurger handleMenu={handleMenu} />}
       </header>
   </>

}