import { useAppStore } from "../utils/store.js";


export const Home = () => {

    const user = useAppStore.use.user()


    console.log(user)

    return <>

        <h1>Home</h1>



    </>;

}