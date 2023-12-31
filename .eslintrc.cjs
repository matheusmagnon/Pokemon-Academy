module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['prettier', '@typescript-eslint', 'react'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        // eqeqeq: 'error',
        // 'no-console': 'warn',
        // 'no-undef': 'off',
        // 'no-unused-vars': 'off',
        // 'prettier/prettier': 'error',

        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        "react/no-unescaped-entities": 0,
        '@typescript-eslint/no-explicit-any': 'off',
        // '@typescript-eslint/no-unused-vars': 'warn',
    },

};
