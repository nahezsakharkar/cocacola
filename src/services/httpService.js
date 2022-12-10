import axios from 'axios';
import { toast } from 'react-toastify';

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    const unauthorized = (error.response && error.response.status === 401)

    if (unauthorized) {
        console.log("Account does not exist or is unauthorized,", error);
        toast.error("This Account is Unauthorized. Please Check Credentials and Try Again!");
    } else if (!expectedError) {
        console.log("Logging the error", error);
        toast.error("An unexpected error occurrred.");
    }

    return Promise.reject(error)
});


const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}

export default http;
