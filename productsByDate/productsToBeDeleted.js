var fs = require("fs");
const moment = require("moment");

function getProducts() {
  try {
    let today = new Date();
    let oldDate = moment(today.setDate(today.getDate() - 40)).format(
      "YYYY-MM-DD"
    );

    const products = JSON.parse(fs.readFileSync("abstract_product.json"));
    console.log(products.length);

    const filtered = filterProducts(products, oldDate);

    const codes = filtered.map((prod) => prod.product_code);

    fs.writeFileSync("toBeDeleted.json", JSON.stringify(codes));

    console.log(filtered.length);
    process.exit();
  } catch (error) {
    console.log("error");
  }
}

function filterProducts(products, oldDate) {
  const disabled = products.filter((prod) => {
    return prod.website_enabled && prod.website_enabled === "false";
  });

  const updated = disabled.filter((product) => {
    return (
      product.update_ts &&
      product.update_ts != "null" &&
      moment(product.update_ts).isAfter(oldDate)
    );
  });

  return updated;
}

getProducts();
