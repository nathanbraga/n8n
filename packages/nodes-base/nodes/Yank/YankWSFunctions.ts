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

import { NodeApiError } from 'n8n-workflow';



export async function captchaResolveApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
    baseUrl: string,
	body?: IDataObject,
	headers?:IDataObject
): Promise<any> {
	const requestOptions = {
		method,
		headers,
		body: JSON.stringify(body),
		url: `${baseUrl}${endpoint}`,
        json: true
	} as IHttpRequestOptions;

	try {
        const response = await this.helpers.request(requestOptions);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, { parseXml: true });
	}
}