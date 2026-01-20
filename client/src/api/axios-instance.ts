import Axios, { type AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({
    baseURL: 'http://localhost:8080',
});

export const customInstance = <T>(config: AxiosRequestConfig | string, options?: AxiosRequestConfig): Promise<T> => {
    const source = Axios.CancelToken.source();

    // Handle both customInstance(url, config) and customInstance(config)
    const requestConfig = typeof config === 'string'
        ? { ...options, url: config }
        : config;

    const promise = AXIOS_INSTANCE({
        ...requestConfig,
        cancelToken: source.token,
    }).then((response) => response as T);

    // @ts-ignore
    promise.cancel = () => {
        source.cancel('Query was cancelled');
    };

    return promise;
};