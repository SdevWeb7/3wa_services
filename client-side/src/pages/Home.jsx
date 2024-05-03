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


       <p style={{marginTop: '5rem'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi, corporis cum cumque dignissimos dolores eos fuga id laborum praesentium, quaerat quasi, qui repellendus sapiente voluptatibus! Amet aspernatur cumque pariatur?</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi, corporis cum cumque dignissimos dolores eos fuga id laborum praesentium, quaerat quasi, qui repellendus sapiente voluptatibus! Amet aspernatur cumque pariatur?</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi, corporis cum cumque dignissimos dolores eos fuga id laborum praesentium, quaerat quasi, qui repellendus sapiente voluptatibus! Amet aspernatur cumque pariatur?</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi, corporis cum cumque dignissimos dolores eos fuga id laborum praesentium, quaerat quasi, qui repellendus sapiente voluptatibus! Amet aspernatur cumque pariatur?</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi, corporis cum cumque dignissimos dolores eos fuga id laborum praesentium, quaerat quasi, qui repellendus sapiente voluptatibus! Amet aspernatur cumque pariatur?</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi, corporis cum cumque dignissimos dolores eos fuga id laborum praesentium, quaerat quasi, qui repellendus sapiente voluptatibus! Amet aspernatur cumque pariatur?</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi, corporis cum cumque dignissimos dolores eos fuga id laborum praesentium, quaerat quasi, qui repellendus sapiente voluptatibus! Amet aspernatur cumque pariatur?</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi, corporis cum cumque dignissimos dolores eos fuga id laborum praesentium, quaerat quasi, qui repellendus sapiente voluptatibus! Amet aspernatur cumque pariatur?</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi, corporis cum cumque dignissimos dolores eos fuga id laborum praesentium, quaerat quasi, qui repellendus sapiente voluptatibus! Amet aspernatur cumque pariatur?</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi, corporis cum cumque dignissimos dolores eos fuga id laborum praesentium, quaerat quasi, qui repellendus sapiente voluptatibus! Amet aspernatur cumque pariatur?</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi, corporis cum cumque dignissimos dolores eos fuga id laborum praesentium, quaerat quasi, qui repellendus sapiente voluptatibus! Amet aspernatur cumque pariatur?</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi, corporis cum cumque dignissimos dolores eos fuga id laborum praesentium, quaerat quasi, qui repellendus sapiente voluptatibus! Amet aspernatur cumque pariatur?</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi, corporis cum cumque dignissimos dolores eos fuga id laborum praesentium, quaerat quasi, qui repellendus sapiente voluptatibus! Amet aspernatur cumque pariatur?</p>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut commodi, corporis cum cumque dignissimos dolores eos fuga id laborum praesentium, quaerat quasi, qui repellendus sapiente voluptatibus! Amet aspernatur cumque pariatur?</p>
    </main>;

}