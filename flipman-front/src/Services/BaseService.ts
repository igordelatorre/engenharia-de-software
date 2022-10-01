import axios, { AxiosResponse } from "axios";

const baseURL =
  process.env.NODE_ENV === "development" || !process.env.NODE_ENV
   // ? "https://localhost:7021"
    ? "http://15.229.23.79"
    : `http://15.229.23.79`;

const api = axios.create({
  baseURL,
});

class BaseService {
  static post<Payload, Response>(
    modelName: string,
    data: Payload,
    route = ""
  ): Promise<AxiosResponse<Response>> {
    return api.post(`${modelName}${route}`, data);
  }

  static get<Response, Query>(
    modelName: string,
    route = "",
    query?: Query,
    responseType: "json" | "blob" = "json"
  ): Promise<AxiosResponse<Response>> {
    return api.get(`${modelName}${route}`, {
      params: query,
      responseType: responseType,
    });
  }

  static put<Payload, Response>(
    modelName: string,
    data: Payload,
    route = ""
  ): Promise<AxiosResponse<Response>> {
    return api.put(`${modelName}${route}`, data);
  }

  static remove<Payload, Response>(
    modelName: string,
    data: Payload,
    route = ""
  ): Promise<AxiosResponse<Response>> {
    return api.delete(`${modelName}${route}`, { data });
  }
}

export default BaseService;
