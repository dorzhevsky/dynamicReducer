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
    "plugin:lodash/recommended",
    "plugin:storybook/recommended"
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
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/anchor-has-content": [
      "error",
      {
        components: []
      }
    ],
    "jsx-a11y/aria-role": 0,
    "jsx-a11y/aria-props": 0,
    "jsx-a11y/aria-proptypes": 0,
    "jsx-a11y/aria-unsupported-elements": 0,
    "jsx-a11y/alt-text": 0,
    "jsx-a11y/img-redundant-alt": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "jsx-a11y/mouse-events-have-key-events": 0,
    "jsx-a11y/no-access-key": 0,
    "jsx-a11y/no-onchange": 0,
    "jsx-a11y/interactive-supports-focus": 0,
    "jsx-a11y/role-has-required-aria-props": 0,
    "jsx-a11y/role-supports-aria-props": 0,
    "jsx-a11y/tabindex-no-positive": 0,
    "jsx-a11y/heading-has-content": 0,
    "jsx-a11y/html-has-lang": 0,
    "jsx-a11y/lang": 0,
    "jsx-a11y/no-distracting-elements": 0,
    "jsx-a11y/scope": "error",
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/accessible-emoji": "error",
    "jsx-a11y/aria-activedescendant-has-tabindex": "error",
    "jsx-a11y/iframe-has-title": "error",
    "jsx-a11y/no-autofocus": 0,
    "jsx-a11y/no-redundant-roles": "error",
    "jsx-a11y/media-has-caption": 0,
    "jsx-a11y/no-interactive-element-to-noninteractive-role": 0,
    "jsx-a11y/no-noninteractive-element-to-interactive-role": 0,
    "jsx-a11y/no-noninteractive-tabindex": 0,
    "jsx-a11y/anchor-is-valid": 0,
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
