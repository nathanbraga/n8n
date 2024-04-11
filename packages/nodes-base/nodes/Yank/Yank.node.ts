import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
} from 'n8n-workflow';
import { browserFields, browserOperations } from './BrowserDescription.node';
import { fileFields, fileOperations } from './FileDescription.node';

const { Builder, By} = require('selenium-webdriver');
var driver = new Builder().forBrowser('chrome');

export class Yank implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Yank Studio',
		name: 'yankStudio',
		icon: 'file:yank.png',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Yank Studio',
		defaults: {
			name: 'Yank Studio',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Browser',
						value: 'browser',
					},
					{
						name: 'File',
						value: 'file',
					},
					{
						name: 'Ocr',
						value: 'ocr',
					},
				],
				default: 'browser',
			},

			...browserOperations,
			...browserFields,

			...fileOperations,
			...fileFields,
		]
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const qs: IDataObject = {};
		let responseData;
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);
		
		for (let i = 0; i < items.length; i++) {
			let headers: IDataObject = {};
			try {
				if (resource === 'browser') {

					if (operation === 'open') {
						const browser = this.getNodeParameter('browser', i);

						if (browser === 'google') {
							driver = await new Builder().forBrowser('chrome').build()
							driver.manage().window().maximize();
						}

						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray({ success: true }),
							{ itemData: { item: i } },
						);
						returnData.push(...executionData);
					}

					if (operation === 'urlAccess') {

						try{
							const urlAccess = this.getNodeParameter('urlAccess', i);
							await driver.get(urlAccess);
						} catch (error) {
							console.log(error)
							throw error;
						}
						
						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray({ success: true }),
							{ itemData: { item: i } },
						);
						returnData.push(...executionData);
					}

					if (operation === 'findByXpathAndClick') {
						try{
							const xpath = this.getNodeParameter('findByXpathAndClick', i);
							await driver.findElement(By.xpath(xpath)).click();
						} catch (error) {
							console.log(error)
							throw error;
						}
						
						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray({ success: true }),
							{ itemData: { item: i } },
						);
						returnData.push(...executionData);
					}

					if (operation === 'close') {
						try{
							await driver.quit();
						} catch (error) {
							console.log(error)
							throw error;
						}
						
						const executionData = this.helpers.constructExecutionMetaData(
							this.helpers.returnJsonArray({ success: true }),
							{ itemData: { item: i } },
						);
						returnData.push(...executionData);
					}
				}
			} catch (error) {
				console.log(error)
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}
		if (resource === 'browser' && operation === 'download') {
			// For file downloads the files get attached to the existing items
			return [items];
		} else {
			return [returnData];
		}
	}
}
