import { useContext } from "react";
import { myContext } from "../hooks/MyContextProvider.jsx";
import { Link } from "react-router-dom";


export const Home = () => {

    const { user } = useContext(myContext);

    console.log(user)

    return <main className={'main'}>

       <h1>Bienvenue sur votre plateforme!</h1>

       <p>Cette plateforme a pour but de créer une communauté d&apos;entraide.</p>

       <p>Vous pouvez déjà visualiser les services que les autres membres de la communauté proposent, cependant il
          faudra vous inscrire et vous connecter pour proposer ou commander un service.</p>


       <h2 style={{marginTop: "7rem"}}>Règlements</h2>

       <ul>
          <li>Chaque membre reçoit 1000 CommuniTokens à son inscription.</li>
          <li>Les services doivent être légaux et censés : il y aura une modération et votre compte pourra être
             suspendu.
          </li>
          <li>Les services doivent être réalisables dans un temps raisonnable.</li>
          <li>Plus vous rendez de services plus votre profil sera mis en avant.</li>
       </ul>


       <h2 style={{marginTop: "7rem"}}>Récompenses</h2>
       <p>En fonction de l&apos;évolution de la plateforme des récompenses pourront être gagnées en fonction du nombre de services rendus :</p>

       <ul style={{marginTop: '2rem'}}>
          <li>CommuniTokens</li>
          <li>Cartes cadeaux</li>
       </ul>



       <div className="links-home">
          {!user || Object.keys(user).length === 0 && <Link to={'/auth'} className={'btn btn-primary'}>S&apos;inscrire / Se connecter</Link>}
         <Link to={'/services'} target={'_top'} className={'btn btn-secondary'}>Explorer les services</Link>
       </div>

    </main>;

}