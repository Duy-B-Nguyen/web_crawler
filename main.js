const { crawlPage } = require('./crawl.js')
const { report } = require('./report.js')

const main = async () => {
  try {
    if (process.argv.length !== 3) {
      throw new Error("Error: Please input exactly 1 command line argument");
    } else {
      const rootURL = process.argv[2] 
      console.log("Starting crawl at:", rootURL)
      const pages = await crawlPage(rootURL, rootURL, {});
      report(pages)
    }
  } catch (error) {
    console.error(error.message);
    return 1;
  }
};

main();
