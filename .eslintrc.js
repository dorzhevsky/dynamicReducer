module.exports = {
  env: {
    browser: true,
    jasmine: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "prettier",
    "plugin:jest/recommended",
    "plugin:lodash/recommended"
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "prettier", "no-loops", "jest", "lodash"],
  rules: {
    "react/sort-comp": [
      1,
      {
        order: ["static-methods", "lifecycle", "everything-else", "rendering"],
        groups: {
          rendering: ["/^render.+$/", "render"]
        }
      }
    ],
    "prettier/prettier": ["error"],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "func-names": 0,
    "no-console": [
      "error",
      {
        allow: ["warn", "error"]
      }
    ],
    "lodash/prop-shorthand": 0,
    "no-var": "error",
    "no-bitwise": 0,
    "comma-dangle": 0,
    "react/destructuring-assignment": 0,
    "no-loops/no-loops": 2,
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true
      }
    ],
    "react/require-default-props": 0,
    "react/no-unused-prop-types": [2, { skipShapeProps: false }],
    "lodash/prefer-lodash-method": [
      2,
      {
        ignoreMethods: ["map"]
      }
    ],
    radix: ["error", "as-needed"],
    "react/display-name": 0,
    "react/jsx-props-no-spreading": "off"
  },
  overrides: [
  ],
  settings: {
    react: {
      "jsx-uses-react ": true
    },
    "import/resolver": {
      node: {
        paths: ["src"]
      }
    }
  }
};
