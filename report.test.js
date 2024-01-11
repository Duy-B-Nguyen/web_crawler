const { test, expect } = require("@jest/globals");
const { sortPages } = require("./report.js");

test("sortPages 2 pages", () => {
  const input = {
    'https://www.google.com/path': 1,
    'https://www.google.com': 3
  }
  const actual = sortPages(input);
  const expected = [
  ["https://www.google.com", 3], 
  ["https://www.google.com/path", 1]
];
  expect(actual).toEqual(expected)
});

test("sortPages 6 pages", () => {
  const input = {
    "https://www.google.com": 5,
    "https://www.google.com/path": 1,
    "https://www.google.com/path/one": 4,
    "https://www.google.com/path/two": 2,
    "https://www.google.com/path/three": 6,
    "https://www.google.com/path/four": 7,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://www.google.com/path/four", 7],
    ["https://www.google.com/path/three", 6],
    ["https://www.google.com", 5],
    ["https://www.google.com/path/one", 4],
    ["https://www.google.com/path/two", 2],
    ["https://www.google.com/path", 1]

  ];
  expect(actual).toEqual(expected);
});

