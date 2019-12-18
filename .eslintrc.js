module.exports = {
    "env": {
      "es6": true,
      "jest": true,
    },
    "extends": [
      "airbnb-base",
      "eslint:recommended",
      "plugin:import/recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
      "prettier/@typescript-eslint",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
    },
    "plugins": [
        "prettier",
        "@typescript-eslint",
    ],
    "rules": {
      "prettier/prettier": [2,
        {
          "semi": true,
          "singleQuote": true,
          "trailingComma": "es5",
          "printWidth": 100,
          "tabWidth": 2,
          "arrowParens": "always",
        }
      ],
      "import/no-unresolved": 0,
      "import/prefer-default-export": 0,
      "import/no-extraneous-dependencies": 0,
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true
        }
      ]
    }
};
