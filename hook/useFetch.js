import { useState, useEffect} from 'react';
import axios from 'axios';

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const options = {
        method: 'GET',
        url: 'https://pizzaallapala.p.rapidapi.com/productos-promo',
        headers: {
          'X-RapidAPI-Key': '473bc0fe66msh363010cd87c16bap115107jsnb643fa8c3d0c',
          'X-RapidAPI-Host': 'pizzaallapala.p.rapidapi.com'
        }
    };
    const options2 = {
        method: 'GET',
        url: 'https://4dca-137-132-26-96.ngrok-free.app/get',
        headers: {
            "ngrok-skip-browser-warning": "69420"
          }
    }
    const fetchData = async () => {
        setIsLoading(true);

        try {
            // const response = await axios.request
            // (options);

            // setData(response.data.promo)

            // const res = await axios.get('https://e1d9-137-132-26-96.ngrok-free.app/get')
            // setData(res.data)

            const response = await axios.request(options2)
            setData(response.data)
        } catch (error) {
            console.log(error.message)
            setError(error);
            alert('There is an error');
        } finally {
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return {data, isLoading, error, refetch};
}

export default useFetch;
