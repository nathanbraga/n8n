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
	headers?:IDataObject
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
            ...headers,
            'Content-Type': 'application/x-www-form-urlencoded', // Define o tipo de conteúdo como application/x-www-form-urlencoded
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