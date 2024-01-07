const main = () => {
  try {
    if (process.argv.length !== 3) {
      throw new Error("Error: Please input exactly 1 command line argument");
    } else {
      return "Starting craw";
    }
  } catch (error) {
    console.error(error.message);
    return 1;
  }
};

main();
