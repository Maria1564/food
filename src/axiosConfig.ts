import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://api.spoonacular.com',
  })

apiClient.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        apiKey: "7ead15bb2f77463e8f157ef20a115a07"
    }

    return config
})

