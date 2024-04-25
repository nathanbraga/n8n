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
import { captchaFields, captchaOperations } from './CaptchaDescription.node';
import { captchaResolveApiRequestV2 } from './YankWSFunctions';
import { imageFields } from '../Bannerbear/ImageDescription';

const { Builder, By } = require('selenium-webdriver');
var driver = new Builder().forBrowser('chrome');

export class YankStudio implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Yank Studio',
		name: 'yankStudio',
		icon: 'file:Yank-Logo-Degrade-simbolo.png',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Yank Studio',
		defaults: {
			name: 'Yank Studio',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'yankStudioWS',
				required: true,
			},
		],
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
					{
						name: 'Captcha',
						value: 'captcha',
					},
				],
				default: 'browser',
			},

			...browserOperations,
			...browserFields,

			...fileOperations,
			...fileFields,

			...captchaOperations,
			...captchaFields,
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

						try {
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
						try {
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
						try {
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

					if (operation === 'sendKeysToTextBox') {
						const textBoxId = this.getNodeParameter('textBoxId', i);
						const messageToTextBox = this.getNodeParameter('messageToTextBox', i);

						try {
							await driver.findElement(By.id(textBoxId)).sendKeys(messageToTextBox);
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

				if (resource === 'captcha') {

					if (operation === 'captchaResolve') {

						const urlXpath = this.getNodeParameter('captchaXpath', i);
						const company = this.getNodeParameter('company', i);
						const password = this.getNodeParameter('password', i);
						const user = this.getNodeParameter('user', i);
						const textbox = this.getNodeParameter('textBox', i);
						const clickButton = this.getNodeParameter('clickButton', i);

						const captchaElement = await driver.findElement(By.id(urlXpath));

						const base64Image = await captchaElement.takeScreenshot(true);

						const responseData = await captchaResolveApiRequestV2.call(
							this,
							'' + company,
							'' + user,
							'' + password,
							'' + base64Image
						);

						await driver.findElement(By.id(textbox)).sendKeys(responseData);

						await driver.findElement(By.id(clickButton)).click();
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
