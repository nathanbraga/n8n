import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class YankStudio implements ICredentialType {
	name = 'yankStudioWS';

	displayName = 'Yank Studio WS';

	documentationUrl = 'yankStudioWS';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
		{
			displayName: 'Organization ID (optional)',
			name: 'organizationId',
			type: 'string',
			default: '',
			hint: 'Only required if you belong to multiple organisations',
			description:
				"For users who belong to multiple organizations, you can set which organization is used for an API request. Usage from these API requests will count against the specified organization's subscription quota.",
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
				'YankWS-Organization': '={{$credentials.organizationId}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://yankstudio-baserurl.com',
			url: '/endpoint',
		},
	};
}
