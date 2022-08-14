import axios, { AxiosResponse } from 'axios'

const api = axios.create({
	baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`
})



class BaseService {
	static post<Payload, Response>(
		modelName: string,
		data: Payload,
		route = ''
	): Promise<AxiosResponse<Response>> {
		return api.post(`${modelName}${route}`, data)
	}

	static get<Response, Query>(
		modelName: string,
		route = '',
		query?: Query,
		responseType: 'json' | 'blob' = 'json'
	): Promise<AxiosResponse<Response>> {
		return api.get(`${modelName}${route}`, {
			params: query,
			responseType: responseType
		})
	}

	static put<Payload, Response>(
		modelName: string,
		data: Payload,
		route = ''
	): Promise<AxiosResponse<Response>> {
		return api.put(`${modelName}${route}`, data)
	}

	static remove<Payload, Response>(
		modelName: string,
		data: Payload,
		route = ''
	): Promise<AxiosResponse<Response>> {
		return api.delete(`${modelName}${route}`, { data })
	}
}

export default BaseService
