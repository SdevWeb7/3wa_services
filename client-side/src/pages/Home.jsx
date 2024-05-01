import { useEffect, useState } from "react";

export const Home = () => {

    const [data, setData] = useState(null);


    useEffect(() => {
        fetch('http://127.0.0.1:3000/api')
           .then((res) => res.json())
           .then((data) => setData(data.message));
    }, []);



    return <>

        <h1>Home</h1>

        {data && <h2>{data}</h2>}

    </>;

}