import type { INodeProperties } from 'n8n-workflow';

export const browserOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['browser'],
			},
		},
		options: [
			{
				name: 'Open',
				value: 'open',
				description: 'Open a browser',
				action: 'Open a browser',
			},
            {
				name: 'Url Access',
				value: 'urlAccess',
				description: 'Url Access',
				action: 'Url Access',
			},
			{
				name: 'Close',
				value: 'close',
				description: 'Close a browser',
				action: 'Close a browser',
			},
			{
				name: 'Find By Xpath',
				value: 'findByXpath',
				description: 'Find By Xpath',
				action: 'Find By Xpath',
			},
			{
				name: 'Find By CssSelector',
				value: 'findByCssSelector',
				description: 'Find By CssSelector',
				action: 'Find By CssSelector',
			},
		],
		default: 'open',
	},
];

export const browserFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                bucket:create                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Browser',
		name: 'browser',
		type: 'collection',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['browser'],
				operation: ['open'],
			},
		},
        options:[
            {
				displayName: 'Google',
				name: 'google',
				value: 'google',
				default: true,
				description: 'Google WebDriver',
			},
            {
				displayName: 'Firefox',
				name: 'firefox',
				value: 'firefox',
				default: false,
				description: 'Firefox WebDriver',
			},
        ],
		description: 'Select browser that you want to use.',
	},
	// {
	// 	displayName: 'Additional Fields',
	// 	name: 'additionalFields',
	// 	type: 'collection',
	// 	placeholder: 'Add Field',
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['bucket'],
	// 			operation: ['create'],
	// 		},
	// 	},
	// 	default: {},
	// 	options: [
	// 		{
	// 			displayName: 'ACL',
	// 			name: 'acl',
	// 			type: 'options',
	// 			options: [
	// 				{
	// 					name: 'Authenticated Read',
	// 					value: 'authenticatedRead',
	// 				},
	// 				{
	// 					name: 'Private',
	// 					value: 'Private',
	// 				},
	// 				{
	// 					name: 'Public Read',
	// 					value: 'publicRead',
	// 				},
	// 				{
	// 					name: 'Public Read Write',
	// 					value: 'publicReadWrite',
	// 				},
	// 			],
	// 			default: '',
	// 			description: 'The canned ACL to apply to the bucket',
	// 		},
	// 		{
	// 			displayName: 'Bucket Object Lock Enabled',
	// 			name: 'bucketObjectLockEnabled',
	// 			type: 'boolean',
	// 			default: false,
	// 			description: 'Whether you want S3 Object Lock to be enabled for the new bucket',
	// 		},
	// 		{
	// 			displayName: 'Grant Full Control',
	// 			name: 'grantFullControl',
	// 			type: 'boolean',
	// 			default: false,
	// 			description:
	// 				'Whether to allow grantee the read, write, read ACP, and write ACP permissions on the bucket',
	// 		},
	// 		{
	// 			displayName: 'Grant Read',
	// 			name: 'grantRead',
	// 			type: 'boolean',
	// 			default: false,
	// 			description: 'Whether to allow grantee to list the objects in the bucket',
	// 		},
	// 		{
	// 			displayName: 'Grant Read ACP',
	// 			name: 'grantReadAcp',
	// 			type: 'boolean',
	// 			default: false,
	// 			description: 'Whether to allow grantee to read the bucket ACL',
	// 		},
	// 		{
	// 			displayName: 'Grant Write',
	// 			name: 'grantWrite',
	// 			type: 'boolean',
	// 			default: false,
	// 			description:
	// 				'Whether to allow grantee to create, overwrite, and delete any object in the bucket',
	// 		},
	// 		{
	// 			displayName: 'Grant Write ACP',
	// 			name: 'grantWriteAcp',
	// 			type: 'boolean',
	// 			default: false,
	// 			description: 'Whether to allow grantee to write the ACL for the applicable bucket',
	// 		},
	// 		{
	// 			displayName: 'Region',
	// 			name: 'region',
	// 			type: 'string',
	// 			default: '',
	// 			description:
	// 				'Region you want to create the bucket in, by default the buckets are created on the region defined on the credentials',
	// 		},
	// 	],
	// },

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
