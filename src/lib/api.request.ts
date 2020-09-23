import HttpRequest from './axios'
import {apiUrl} from '../config/config'
const baseUrl = process.env.NODE_ENV === 'development' ? apiUrl.dev : apiUrl.pro
const axios = new HttpRequest(baseUrl)
export default axios
