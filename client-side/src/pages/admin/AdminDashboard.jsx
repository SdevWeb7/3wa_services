import { useContext, useEffect, useState } from "react";
import { Spinner } from "../../components/Spinner.jsx";
import { myContext } from "../../hooks/MyContextProvider.jsx";
import { useAppStore } from "../../utils/store.js";

export const AdminDashboard = () => {
    const {user} = useContext(myContext);
    const addToast = useAppStore.use.addToast();
    const [reportedServices, setReportedServices] = useState([]);

    useEffect(() => {
         fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/admin/all`, {
               credentials: 'include'
         }).then(r => r.json())
               .then(d => setReportedServices(d || []))
               .catch(e => console.error(e))
    }, []);


    const handleDelete = (id) => {
         fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/admin/delete/${id}`, {
               method: 'DELETE',
               credentials: 'include'
         }).then(r => r.json())
               .then(d => {
                  if (!d.err) {
                      addToast('success', 'Service supprimé.');
                      setReportedServices(reportedServices.filter(s => s.id !== id));
                  } else addToast('error', 'Une erreur est survenue.');
               })
               .catch(e => {
                   addToast('error', 'Une erreur est survenue.');
                   console.error(e)
               })
    }

    const handleBan = (id) => {
         fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/admin/ban/${id}`, {
               method: 'PATCH',
               credentials: 'include'
         }).then(r => r.json())
               .then(d => {
                  if (!d.err) {
                      addToast('success', 'Utilisateur banni.');
                  } else addToast('error', 'Une erreur est survenue.');
               })
               .catch(e => {
                   addToast('error', 'Une erreur est survenue.');
                   console.error(e)
               })
    }

    const handleRestore = (id) => {
         fetch(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/admin/restore/${id}`, {
               method: 'PATCH',
               credentials: 'include'
         }).then(r => r.json())
               .then(d => {
                  if (!d.err) {
                      addToast('success', 'Service remis en ligne.');
                      setReportedServices(reportedServices.filter(s => s.id !== id));
                  } else addToast('error', 'Une erreur est survenue.');
               })
               .catch(e => {
                   addToast('error', 'Une erreur est survenue.');
                   console.error(e)
               })
    }

    if (!user) return <Spinner />;

    else if (Object.keys(user).length === 0) window.location.href = '/auth';

    else return <><h1>Dashboard Admin</h1>

            <section className={'admin-dashboard'}>


                {reportedServices.length === 0 ? <>
                    <h2 style={{width: "100%"}}>Il n&apos;a pas l&apos;air d&apos;avoir de problème.</h2>
                       <Spinner/></> :

                   reportedServices.map((service, i) => {
                        const imgSrc = service.img_src === 'http://via.placeholder.com/640x360' ? service.img_src : `${import.meta.env.VITE_BASE_URL_BACKEND}/img/${service.img_src}`;
                        return <article key={i} className={'card reported-service'}>

                            <img src={imgSrc} alt={service.title}/>

                            <p>{service.description}</p>

                            <p>Par : {service.email}</p>

                            <button
                               onClick={() => handleRestore(service.id)}
                               className={'btn btn-primary'}>Remettre en ligne</button>


                            <button
                               onClick={() => handleDelete(service.id)}
                               className={'btn btn-secondary'}>Supprimer le service</button>

                            <button
                               onClick={() => handleBan(service.user_id)}
                               className={'btn btn-danger'}>Bannir utilisateur</button>

                        </article>
                    })}

            </section>
        </>;
}