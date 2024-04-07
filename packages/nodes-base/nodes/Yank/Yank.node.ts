import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
// import { oldVersionNotice } from '../../utils/descriptions';
// import { imageFields, imageOperations } from './ImageDescription';
// import { textFields, textOperations } from './TextDescription';
// import { chatFields, chatOperations } from './ChatDescription';

export class Yank implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Yank Studio',
		name: 'Yank',
		// hidden: true,
		icon: 'file:yank.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Yank Studio',
		defaults: {
			name: 'Yank Studio',
		},
		inputs: ['main'],
		outputs: ['main'],
		// credentials: [
		// 	{
		// 		name: 'openAiApi',
		// 		required: true,
		// 	},
		// ],
		// requestDefaults: {
		// 	ignoreHttpStatusErrors: true,
		// 	baseURL: 'https://api.openai.com',
		// },
		properties: [
			// oldVersionNotice,
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat',
						value: 'chat',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Text',
						value: 'text',
					},
				],
				default: 'text',
			},

			// ...chatOperations,
			// ...chatFields,

			// ...imageOperations,
			// ...imageFields,

			// ...textOperations,
			// ...textFields,
		],
	};
}
