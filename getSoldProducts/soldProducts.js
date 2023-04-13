var fs = require("fs");

function getProducts() {
  try {
    // const exist = fs.existsSync('getNumberProductsOk/abstract_product.json');
    // console.log(exist);
    const products = JSON.parse(fs.readFileSync("abstract_product.json"));
    console.log(products.length);
    let sold = [];

    products.forEach((prod) => {
      if (
        prod.status_id === "193d60273d55eed7cf738b97bb92fd33" &&
        prod.website_enabled === "false" &&
        prod.delete_ts === "null"
      ) {
        if (!sold.includes(prod.product_code)) {
          sold.push(prod.product_code);
        }
      }
    });
    console.log(sold.length);
    fs.writeFileSync("soldProducts.json", JSON.stringify(sold));
    process.exit();
  } catch (error) {}
}

getProducts();
