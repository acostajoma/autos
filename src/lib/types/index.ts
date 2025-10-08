export type Theme = 'light' | 'dark';
type FormFailureData = {
	fieldsErrors?: {
		[key: string]:
			| {
					errors: string[];
			  }
			| undefined;
	};
	values?: {
		[key: string]: string | number | undefined;
	};
	formError?: string;
};

export type FailureActionData = {
	[key: string]: FormFailureData;
};
