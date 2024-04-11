import type { INodeProperties } from 'n8n-workflow';

export const fileOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['file'],
			},
		},
		options: [
			{
				name: 'Read text file',
				value: 'readTextFile',
				description: 'Read text file',
				action: 'Read text file',
			},
            {
				name: 'Read excel file',
				value: 'readExcelFile',
				description: 'Read excel file',
				action: 'Read excel file',
			},
			{
				name: 'Write text file',
				value: 'writeTextFile',
				description: 'Write text file',
				action: 'Write text file',
			},
			{
				name: 'Write excel file',
				value: 'writeExcelFile',
				description: 'Write excel file',
				action: 'Write excel file',
			},
			{
				name: 'Find By CssSelector',
				value: 'findByCssSelector',
				description: 'Find By CssSelector',
				action: 'Find By CssSelector',
			},
		],
		default: 'readTextFile',
	},
];

export const fileFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                Browser:Open                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'File',
		name: 'browser',
		type: 'options',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['file'],
				operation: ['readTextFile'],
			},
		},
        options:[
            {
				displayName: 'Text',
				name: 'text',
				value: 'text',
				default: true,
				description: 'Text file',
			},
            {
				displayName: 'Excel',
				name: 'excel',
				value: 'excel',
				default: false,
				description: 'Excel file',
			},
        ],
		description: 'Select file type that you want to read.',
	},

	/* -------------------------------------------------------------------------- */
	/*                                Browser:URL Access                          */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'URL Access',
		name: 'urlAccess',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['browser'],
				operation: ['urlAccess'],
			},
		},
		description: 'Put your url.',
	},
	{
		displayName: 'Find By Xpath and Click',
		name: 'findByXpathAndClick',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['browser'],
				operation: ['findByXpathAndClick'],
			},
		},
		description: 'Put your url.',
	},
	{
		displayName: 'Close Browser',
		name: 'close',
		type: 'hidden',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['browser'],
				operation: ['close'],
			},
		},
	},

	/* -------------------------------------------------------------------------- */
	/*                                bucket:delete                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['bucket'],
				operation: ['delete'],
			},
		},
		description: 'Name of the AWS S3 bucket to delete',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 bucket:getAll                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['getAll'],
				resource: ['bucket'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				operation: ['getAll'],
				resource: ['bucket'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		default: 100,
		description: 'Max number of results to return',
	},
	/* -------------------------------------------------------------------------- */
	/*                                 bucket:search                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Bucket Name',
		name: 'bucketName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['bucket'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['search'],
				resource: ['bucket'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				operation: ['search'],
				resource: ['bucket'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		default: 100,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['bucket'],
				operation: ['search'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Delimiter',
				name: 'delimiter',
				type: 'string',
				default: '',
				description: 'A delimiter is a character you use to group keys',
			},
			{
				displayName: 'Encoding Type',
				name: 'encodingType',
				type: 'options',
				options: [
					{
						name: 'URL',
						value: 'url',
					},
				],
				default: '',
				description: 'Encoding type used by Amazon S3 to encode object keys in the response',
			},
			{
				displayName: 'Fetch Owner',
				name: 'fetchOwner',
				type: 'boolean',
				default: false,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
				description:
					'The owner field is not present in listV2 by default, if you want to return owner field with each key in the result then set the fetch owner field to true',
			},
			{
				displayName: 'Prefix',
				name: 'prefix',
				type: 'string',
				default: '',
				description: 'Limits the response to keys that begin with the specified prefix',
			},
			{
				displayName: 'Requester Pays',
				name: 'requesterPays',
				type: 'boolean',
				default: false,
				description:
					'Whether the requester will pay for requests and data transfer. While Requester Pays is enabled, anonymous access to this bucket is disabled.',
			},
			{
				displayName: 'Start After',
				name: 'startAfter',
				type: 'string',
				default: '',
				description:
					'StartAfter is where you want Amazon S3 to start listing from. Amazon S3 starts listing after this specified key.',
			},
		],
	},
];
