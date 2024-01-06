const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl.js");

test("get hostname of https://www.google.com/path/", () => {
  expect(normalizeURL("https://www.google.com/path/"))
  .toBe("www.google.com/path");
});

test("get hostname of https://www.google.com/path", () => {
  expect(normalizeURL("https://www.google.com/path"))
  .toBe("www.google.com/path");
});

test("get hostname of http://www.google.com/path/", () => {
  expect(normalizeURL("http://www.google.com/path/"))
  .toBe("www.google.com/path");
});

test("get hostname of https://www.google.com/path", () => {
  expect(normalizeURL("https://www.google.com/path"))
  .toBe("www.google.com/path");
});