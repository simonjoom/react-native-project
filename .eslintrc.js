module.exports = {
  env: {
    browser: true,
    es6: true,
    "react-native/react-native": true
  },
  extends: [
    "standard",
    "plugin:flowtype/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/flowtype",
    "prettier/react",
    "prettier/standard", 
    "plugin:react-native/all"
  ],
  plugins: ["flowtype", "react","react-native", "prettier", "standard"],
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {    
  "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }]
    "prettier/prettier": "error"
  },

  settings: {
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: "React", // Pragma to use, default to "React"
      version: "16.0", // React version, default to the latest React stable release
      flowVersion: "0.53" // Flow version
    }
  }
};
