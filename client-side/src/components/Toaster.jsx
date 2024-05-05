import { useEffect } from 'react';
import { findClassByType } from "../utils/utils.js";
import { IconClose } from "../svg/IconClose.jsx";
import { useAppStore } from "../utils/store.js";

export function Toaster () {

    const toasts = useAppStore.use.toasts()
    const setToasts = useAppStore.use.setToasts();


    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => {
                setToasts([])
            }, 5000)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [toasts])



    return <>

        {toasts.length > 0 && <div className="toaster">

               <IconClose onClick={() => setToasts([])} />

               {toasts.map(({type, message}) => <p key={Math.floor(Math.random()*100000)} className={findClassByType(type)}>{message}</p>)}

           </div>}
    </>
}
export default Toaster;