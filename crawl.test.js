const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl.js");


// normalizeURL
test("get hostname of https://www.google.com/path/", () => {
  expect(normalizeURL("https://www.google.com/path/"))
  .toBe("www.google.com/path");
});

test("get hostname of https://www.google.com/path", () => {
  expect(normalizeURL("https://www.google.com/path"))
  .toBe("www.google.com/path");
});

test("get hostname of http://www.GOOGLE.com/path/", () => {
  expect(normalizeURL("http://www.GOOGLE.com/path/"))
  .toBe("www.google.com/path");
});

test("get hostname of http://www.google.com/path", () => {
  expect(normalizeURL("https://www.google.com/path"))
  .toBe("www.google.com/path");
});


// getURLsFromHTML
const testHtml1 = `
  <html>
    <body>
      <a href="/path/one">
        <span>Go to Google.com/path/one</span>
      </a>
      <a href="/path/two">
        <span>Go to Google.com/path/two</span>
      </a>
    </body>
  </html>
`;

const testHtml2 = `
  <html>
    <body>
      <main>
        <div>
          <a href="https://www.mozilla.org/en-US/">
            <span>Go to Mozilla.org</span>
          </a>
          <a href="https://www.opera.com/">
            <span>Go to Opera.org</span>
          </a>
          <a href="https://brave.com/">
            <span>Go to Brave.com</span>
          </a>
          <a href="https://support.apple.com/downloads/safari">
            Go to Safari.com
          </a>
          <a href="/path/one">
            Go to Google.com 
          </a>
        </div>
      </main>
    </body>
  </html>
`;

const testHtml3 = `
  <html>
    <body>
      <h1>These links navigate to different search engines</h1>
      <ul>
        <li>
          <a href="https://www.google.com/">
            <span>Go to Google.com</span>
          </a>
        </li>
        <li>
          <a href="https://www.bing.com/">
            <span>Go to Bing.com</span>
          </a>
        </li>
        <li>
          <a href="https://duckduckgo.com/">
            <span>Go to Duckduckgo.com</span>
          </a>
        </li>
      </ul>
    </body>
  </html>
`;


test("getURLsFromHTML relative", () => {
  expect(getURLsFromHTML(testHtml1, "https://www.google.com")).toEqual([
    "https://www.google.com/path/one",
    "https://www.google.com/path/two",
  ]);
});

test("getURLsFromHTML both", () => {
  expect(getURLsFromHTML(testHtml2, "https://www.google.com")).toEqual([
    "https://www.mozilla.org/en-US/",
    "https://www.opera.com/",
    "https://brave.com/",
    "https://support.apple.com/downloads/safari",
    "https://www.google.com/path/one",
  ]);
});

test("getURLsFromHTML absolute", () => {
  expect(getURLsFromHTML(testHtml3, "https://www.google.com")).toEqual([
    "https://www.google.com/",
    "https://www.bing.com/",
    "https://duckduckgo.com/",
  ]);
});