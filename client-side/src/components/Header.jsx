import { Link } from "react-router-dom";
import { IconBurger } from "../svg/IconBurger.jsx";
import { useContext, useState } from "react";
import { MenuBurger } from "./MenuBurger.jsx";
import { myContext } from "../hooks/MyContextProvider.jsx";

export const Header = () => {
   const { user } = useContext(myContext);
   const [isOpenMenu, setIsOpenMenu] = useState(false);

   const handleMenu = () => {
      setIsOpenMenu(v => !v);
   }

   return <>

       <header className={'header'}>
          <Link className={'logo'} to={'/'}>Community-Services</Link>

           <nav className={'navbar'}>
               <Link className={'navlink'} to="/about">Services</Link>


           </nav>
            <Link className={"navlink btn btn-tertiary"} to="/profil">Profil</Link>

           <Link className="burger btn" onClick={handleMenu}>
              <IconBurger />
           </Link>

            {isOpenMenu && <MenuBurger handleMenu={handleMenu} />}
       </header>
   </>

}