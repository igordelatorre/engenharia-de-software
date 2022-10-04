import axios, { AxiosResponse } from "axios";

const baseURL =
  process.env.NODE_ENV === "development" || !process.env.NODE_ENV
   // ? "https://localhost:7021"
    ? "http://18.229.239.33"
    : `http://18.229.239.33`;

const api = axios.create({
  baseURL,
});

let token = ""

export function setToken(newToken: string) {
  token = newToken
}



class BaseService {
  static post<Payload, Response>(
    modelName: string,
    data: Payload,
    route = ""
  ): Promise<AxiosResponse<Response>> {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.post(`${modelName}${route}`, data, config);
  }

  static get<Response, Query>(
    modelName: string,
    route = "",
    query?: Query,
    responseType: "json" | "blob" = "json"
  ): Promise<AxiosResponse<Response>> {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      params: query,
      responseType: responseType,
    };
    return api.get(`${modelName}${route}`, config);
  }

  static put<Payload, Response>(
    modelName: string,
    data: Payload,
    route = ""
  ): Promise<AxiosResponse<Response>> {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return api.put(`${modelName}${route}`, data, config);
  }

  static remove<Payload, Response>(
    modelName: string,
    data: Payload,
    route = ""
  ): Promise<AxiosResponse<Response>> {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      data
    };
    return api.delete(`${modelName}${route}`, config);
  }
}

export default BaseService;
