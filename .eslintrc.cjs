module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
    settings: {
        react: {
            version: 'detect'
        }
    },
	extends: [
		'plugin:react/recommended',
		'xo',
        "plugin:react/jsx-runtime"
	],
	overrides: [
		{
			extends: [
				'xo-typescript',
			],
			files: [
				'*.ts',
				'*.tsx',
			],
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
	],
	rules: {
    'no-negated-condition': 'off',
	},
};
