const config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  globals: {
    node: true,
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?)$",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  verbose: true,
};

export default config;
