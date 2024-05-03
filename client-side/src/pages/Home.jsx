import { useAppStore } from "../utils/store.js";


export const Home = () => {

    const user = useAppStore.use.user();
    const addToast = useAppStore.use.addToast();

    console.log(user)

    return <main className={'main'}>

            <h1>Home</h1>


       <button
          style={{display: 'block', margin: '0 auto'}}
          className={'btn btn-secondary'}
          onClick={() => addToast('success', Date.now())}>Toast Me</button>
    </main>;

}