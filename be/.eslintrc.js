module.exports = {
    'env': {
        'node': true,
        'es6': true,
        'jest': true,
    },
    'extends': [
        'eslint:recommended',
    ],
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module',
    },
    'rules': {
        'no-misleading-character-class': 'error',
        'no-template-curly-in-string': 'error',
        'no-console': ['warn', { 'allow': ['warn', 'error', 'info'] }],
        'linebreak-style': ['error', 'unix'],

        // Best practices
        'array-callback-return': 'error',
        'consistent-return': 'error',
        'default-case': 'error',
        'eqeqeq': 'error',
        'no-eq-null': 'error',
        'no-param-reassign': 'error',
        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-unused-expressions': 'error',
        'require-await': 'error',
        'radix': 'error',

        // Variables
        'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
        'no-shadow-restricted-names': 'error',

        // Style
        'array-bracket-spacing': 'error',
        'block-spacing': ['error', 'always'],
        'comma-dangle': ['error', {
            'arrays': 'only-multiline',
            'objects': 'only-multiline',
            'imports': 'only-multiline',
            'exports': 'only-multiline',
            'functions': 'never'
        }],
        'comma-spacing': ['error', { 'before': false, 'after': true }],
        'comma-style': ['error', 'last'],
        'computed-property-spacing': ['error', 'never'],
        'eol-last': ['error', 'always'],
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'jsx-quotes': ['error', 'prefer-single'],
        'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
        'keyword-spacing': 'error',
        'max-len': ['error', { 'code': 140 }], // Being lenient here
        'new-parens': 'error',
        'no-mixed-operators': 'error',
        'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 0 }],
        'no-nested-ternary': 'error',
        'no-trailing-spaces': 'error',
        'no-tabs': 'error',
        'object-curly-spacing': ['error', 'always'],
        'prefer-object-spread': 'error',
        'quotes': ['error', 'single', { 'avoidEscape': true }],
        'semi': ['error', 'always', { 'omitLastInOneLineBlock': true }],
        'semi-spacing': ['error', { 'before': false, 'after': true }],
        'space-before-blocks': ['error', 'always'],
        'space-before-function-paren': ['error', {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always',
        }],
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'space-unary-ops': ['error', {
            'words': true,
            'nonwords': false,
        }],
        'spaced-comment': ['error', 'always', { 'exceptions': ['-'] }],
        'switch-colon-spacing': ['error', {
            'after': true,
            'before': false,
        }],
        'brace-style': ['error', '1tbs'],

        // ES6
        'arrow-spacing': 'error',
        'arrow-body-style': ['error', 'as-needed'],
        'arrow-parens': ['error', 'always'],
        'no-duplicate-imports': 'error',
        'no-var': 'error',
        'prefer-const': ['error', { 'destructuring': 'all' }],
        'prefer-template': 'error',
        'template-curly-spacing': 'error',
    },
};
