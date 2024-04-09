import type {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { browserFields, browserOperations } from './BrowserDescription.node';

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
			...browserFields
		]
	};
}
