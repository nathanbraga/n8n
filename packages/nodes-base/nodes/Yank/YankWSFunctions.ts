import { query } from 'express';
import type {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
	IHttpRequestOptions,
	JsonObject,
	IHttpRequestMethods,
	IDataObject
} from 'n8n-workflow';

import axios, { AxiosRequestConfig } from 'axios';

import { NodeApiError } from 'n8n-workflow';



export async function captchaResolveApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	baseUrl: string,
	body?: string,
	headers?: IDataObject
): Promise<any> {
	// const requestOptions = {
	// 	method,
	// 	headers,
	// 	data: JSON.stringify(body),
	// 	url: `${baseUrl}${endpoint}`,
	//     json: true
	// } as IHttpRequestOptions;


	const url = `${baseUrl}${endpoint}`;

	const formattedBody = new URLSearchParams(body).toString();

	const config: AxiosRequestConfig = {
		method,
		url,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'cache-control': 'no-cache',
		},
		data: formattedBody,
		responseType: 'json',
	};

	try {
		const response = await axios(config);
		// const response = await this.helpers.request(requestOptions);
		return response.data;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, { parseXml: true });
	}
}


export async function captchaResolveApiRequestV2(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions | IWebhookFunctions,
	company: string,
	user: string,
	password: string,
	imageBase64: string,
): Promise<any> {

	const params = new URLSearchParams();
	params.append("empresa", company);
	params.append("usuario", user);
	params.append("senha", password);
	params.append("imageBase64", imageBase64);

	// await axios.post("http://workflow.yanksolutions.com.br/ws/api/v1/captcha/simpleversion", params, {
	// 	headers: {
	// 		'Content-Type': 'application/x-www-form-urlencoded',
	// 		'cache-control': 'no-cache'
	// 	}
	// })
	// .then((response) => {
	// 	console.log(response.data);
	// 	return response.data['answer'].toString();
	// })
	// .catch((error) => {
	// 	console.error(error);
	// 	throw new NodeApiError(this.getNode(), error as JsonObject, { parseXml: true });
	// });


	try {
		const response = await axios.post("http://workflow.yanksolutions.com.br/ws/api/v1/captcha/simpleversion", params, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'cache-control': 'no-cache'
			}
		});
		
		console.log(response.data);
		return response.data['answer'].toString(); // Retorna a resposta diretamente
	} catch (error) {
		console.error(error);
		throw new NodeApiError(this.getNode(), error as JsonObject, { parseXml: true });
	}
}