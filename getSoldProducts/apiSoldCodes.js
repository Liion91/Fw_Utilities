var fs = require("fs");

function getProducts() {
  try {
    // const exist = fs.existsSync('getNumberProductsOk/abstract_product.json');
    // console.log(exist);
    const sold = JSON.parse(fs.readFileSync("sold.json"));
    console.log(sold.length);
    const soldCodes = JSON.parse(fs.readFileSync("soldCodes.json"));
    console.log(soldCodes.length);

    let unrecognized = [];
    soldCodes.forEach((element) => {
      const found = sold.find((elem) => elem === element);
      if (!found) {
        unrecognized.push(element);
      }
    });
    console.log(unrecognized.length);

    fs.writeFileSync("soldCodesNotFound.json", JSON.stringify(sold));
    process.exit();
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}

getProducts();
