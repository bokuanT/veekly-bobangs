import { useState, useEffect} from 'react';
import axios from 'axios';

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options2 = {
        method: 'GET',
        url: 'https://e04e-66-96-212-138.ngrok-free.app/get',
        headers: {
            "ngrok-skip-browser-warning": "69420"
          }
    }
    const fetchData = async () => {
        setIsLoading(true);

        try {
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
