var fs = require("fs");

function getProducts() {
  try {
    // const exist = fs.existsSync('getNumberProductsOk/abstract_product.json');
    // console.log(exist);
    const products = JSON.parse(fs.readFileSync("magentoSold.json"));
    console.log(products.items.length);
    let sold = [];

    sold = products.items.map((item) => item.sku);
    console.log(sold.length);
    fs.writeFileSync("apiSoldCodes.json", JSON.stringify(sold));
    process.exit();
  } catch (error) {}
}

getProducts();
