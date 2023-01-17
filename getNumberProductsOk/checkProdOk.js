var fs = require("fs");

function getProducts() {
  try {
    // const exist = fs.existsSync('getNumberProductsOk/abstract_product.json');
    // console.log(exist);
    const products = JSON.parse(
      fs.readFileSync("getNumberProductsOk/abstract_product.json")
    );
    console.log(products.length);
    let prodOk = [];

    products.forEach((prod) => {
      if (prod.website_enabled === "true" && prod.delete_ts === "null") {
        if(!prodOk.includes(prod.product_code)){
          prodOk.push(prod.product_code);
        }
      }
    });
    console.log(prodOk.length);
    process.exit();
  } catch (error) {}
}

getProducts();
