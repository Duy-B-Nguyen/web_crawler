const url = require('url')
const { JSDOM } = require('jsdom');
const { type } = require('os');

const normalizeURL = (urlString) => {
  try {
    const urlObj = new URL(urlString);
    let fullPath = urlObj.host + urlObj.pathname;
    if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
      fullPath = fullPath.slice(0, -1);
    }
    return fullPath;
  } catch (err) {
    console.error("Error normalizing URL:", err.message);
    return null; 
  }
};

const getURLsFromHTML = (htmlString, rootURL) => {
  try {
    const urlList = [];
    const newDom = new JSDOM(htmlString);
    const linkElements = newDom.window.document.querySelectorAll("a");

    for (const linkElement of linkElements) {
      if (linkElement.href) {
        const absoluteURL = linkElement.href.startsWith("/")
          ? rootURL + linkElement.href
          : linkElement.href;
        urlList.push(absoluteURL);
      }
    }

    return urlList;
  } catch (err) {
    console.error("Error extracting URLs from HTML:", err.message);
    return []; 
  };
}

const crawlPage = async (rootURL, currentURL, pages) => {
  try {
    const response = await fetch(rootURL)
    if (response.status >= 400) {
      throw new Error("HTTP error! Status: ", response.status)
    }
    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("text/html")) {
      throw new Error(`Unsupported Content-Type: ${contentType}`);
    }
    console.log(await response.text())
  } catch(err) {
    console.error('Error while crawling page: ', err.message)
    return
  }
}


module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}

