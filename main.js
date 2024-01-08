const { crawlPage } = require('./crawl.js')

const main = () => {
  try {
    if (process.argv.length !== 3) {
      throw new Error("Error: Please input exactly 1 command line argument");
    } else {
      const rootURL = process.argv[2] 
      console.log("Starting crawl at:", rootURL)
      crawlPage(rootURL)
    }
  } catch (error) {
    console.error(error.message);
    return 1;
  }
};

main();
