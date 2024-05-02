export const Login = () => {

    const handleLogin = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const response = await fetch('http://127.0.0.1:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password')
            }),
        })

        const body = await response.json();

        console.log(body);
    }

    return <>
        <h2>Se connecter</h2>
        <p>Ou <a href="/client-side/src/pages/AuthForm">Ou s'inscrire</a></p>

        <form onSubmit={handleLogin}>
            <input type="text" name={'email'}/>
            <input type="text" name={'password'}/>

            <input type="submit" value={"Se connecter"}/>
        </form>
    </>

}