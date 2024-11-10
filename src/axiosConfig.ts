import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://api.spoonacular.com',
  })

apiClient.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        apiKey: "8dfc37f1c8da469191f425ed27182a95"
    }

    return config
})

