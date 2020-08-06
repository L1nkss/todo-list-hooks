module.exports = {
    "setupFiles": ["<rootDir>jest.setup.js"],
    "testURL": "http://localhost/",
    "transform": {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": "babel-jest",
    },
    "testRegex": ".test.(js?|jsx?|tsx?)$",
    "modulePaths": ["<rootDir>/src/components/"],
    "verbose": true,
    "moduleFileExtensions": ["ts", "tsx", "js"],
    "moduleNameMapper": {
        "^@components(.*)$": "<rootDir>/src/components$1",
        "\\.(scss|less|sass|css)$": "<rootDir>/src/__mocks__/styleMock.js"
    }
}