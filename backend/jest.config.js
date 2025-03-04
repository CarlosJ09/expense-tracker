module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^myconfig/prisma/(.*)$": "<rootDir>/prisma/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/mocks/prisma.ts"],
};
