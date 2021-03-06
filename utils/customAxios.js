import axios from 'axios'

let baseURL
if( process.env.NODE_ENV === 'production' ) {
    baseURL = process.env.PROD_API_URL
} else {
    baseURL = process.env.DEV_API_URL
}
const instance = axios.create({
  baseURL,
});

// interceptors
instance.interceptors.request.use((config) => {
  config.baseURL = baseURL
  return config;
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  if (response.data.success) {
    return response.data.message
  } else {
    return Promise.reject(response.data)
  }
}, (error) => {
  return Promise.reject(error.response.data)
})


export default instance