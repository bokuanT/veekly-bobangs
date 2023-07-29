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

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request
            (options);

            setData(response.data.promo)
        } catch (error) {
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
