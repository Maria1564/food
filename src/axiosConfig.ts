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

//8dfc37f1c8da469191f425ed27182a95
//0677f8ad27ef4153ad080cc3330db74d
//3a169c17fb744bb99d5f1f3e37a0168a
//7ead15bb2f77463e8f157ef20a115a07