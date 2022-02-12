
import { Platform } from 'react-native';
import Axios from 'axios'
import useAxios, { configure } from 'axios-hooks'

const baseURL = "https://us.openfoodfacts.org/api/v0"

getUserAgent = () => `Open Food - ${Platform.OS} - Version 1.0`

const axios = Axios.create({
    baseURL: baseURL,
    headers : {
        'User-Agent' : getUserAgent()
    }
})



configure({ axios });

export { useAxios };