import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined in the environment variables.");
}

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 3000,
    headers: {
      "content-type": "application/json",
    },
  });

  return instance;
};

export interface APIRequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

const httpGet = async (endpoint: string, option?: APIRequestOptions) => {
  try {
    const response = await axiosInstance().get(endpoint, {
      params: option?.params,
      headers: option?.headers,
    });
    return response.data;
  } catch (error) {
    console.error(`Get request to ${endpoint} failed : `, error);
  }
};

const httpPost = async (endpoint: string, data: unknown, option?: APIRequestOptions) => {

    try {
        const response = await axiosInstance().post(endpoint, data, {
            headers : option?.headers,
            params: option?.params,
        })    
        return response.data ;
    } catch (error) {
        console.error(`post request to ${endpoint} failed : `, error);
        return error
    }
}

const httpPatch = async (endpoint: string, data: unknown, option?: APIRequestOptions) => {
    try{
            const response = await axiosInstance().patch(endpoint, data, {
                params : option?.params,
                headers : option?.headers,
            })
            return response.data ;
    } catch (error) {
        console.error(`patch request to ${endpoint} failed : `, error);
        return error
    }
}

const httpDelete = async (endpoint: string, option?: APIRequestOptions) => {
    try {
            const response = await axiosInstance().delete(endpoint, {
                headers : option?.headers,
                params : option?.params,
            })
            return response.data;
    } catch (error) {
        console.error(`delete request to ${endpoint} failed. `,error);
        return error;
    }
}

const httpPut = async (endpoint: string, data: unknown, option?: APIRequestOptions) => {
    try {
        const response = await axiosInstance().put(endpoint,data, {
            params :  option?.params,
            headers : option?.headers,
        })
        return response.data;
    } catch (error) {
        console.error(`Put request to ${endpoint} failed. `, error);
        return error;
    }
}

export const httpClient = {
  get: httpGet,
  post : httpPost,
  patch : httpPatch,
  delete : httpDelete,
  put : httpPut,
};
