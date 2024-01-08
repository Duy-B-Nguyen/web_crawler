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
  const rootURLObj = new URL(rootURL)
  const currentURLObj = new URL(currentURL);

  if (rootURLObj.hostname !== currentURLObj.hostname) {
    return pages
  }

  const normalizedCurrentURL = normalizeURL(currentURL)

  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages
  }
  pages[normalizedCurrentURL] = 1
  console.log("Actively crawling:", currentURL)
  try {
    const response = await fetch(rootURL)
    if (response.status >= 400) {
      console.log("HTTP error! Status: ", response.status)
      return pages
    }
    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("text/html")) {
      console.log(`Unsupported Content-Type: ${contentType} on page ${currentURL}`);
      return pages
    }
    const htmlBody = await response.text()

    const nextURLs = getURLsFromHTML(htmlBody, rootURL)

    for(const nextURL of nextURLs) {
      pages = await crawlPage(rootURL, nextURL, pages)
    }

  } catch(err) {
    console.error('Error while crawling page: ', err.message)
    return
  }
  return pages
}


module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}

