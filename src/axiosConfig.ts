import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://api.spoonacular.com',
  })

apiClient.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        apiKey: "3a169c17fb744bb99d5f1f3e37a0168a"
    }

    return config
})

