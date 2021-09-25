export default {
	roots: ["./"],
	setupFiles: ["dotenv/config"],
	moduleNameMapper: {
    '^~/(.*)$':  '<rootDir>/src/$1',
    '^~c/(.*)$': '<rootDir>/src/components/$1',
    '^~s/(.*)$':  '<rootDir>/src/styles/$1',
    '^~sc/(.*)$':  '<rootDir>/src/scenes/$1',
    '^~a/(.*)$':  '<rootDir>/src/assests/$1',
    '^~api/(.)$': '<rootDir>/src/api/$1' 
  },
	"transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
};