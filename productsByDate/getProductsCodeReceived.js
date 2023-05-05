var fs = require("fs");

function getProducts() {
  try {
    let date = "2023-05-04";
    // const products = JSON.parse(fs.readFileSync("prod_Ok_Prod.json"));
    const products = JSON.parse(fs.readFileSync("abstract_product.json"));
    console.log(products.length);

    const filtered = filterProducts(products, date);

    const codes = filtered.map((prod) => prod.product_code);

    // fs.writeFileSync("prods_" + date + ".json", JSON.stringify(codes));
    fs.writeFileSync("prods_" + date + ".json", JSON.stringify(filtered));

    console.log(filtered.length);
    process.exit();
  } catch (error) {
    console.log("error");
  }
}

function filterProducts(products, date) {
  const created = products.filter((prod) => {
    return (
      prod.website_enabled &&
      prod.website_enabled === "true" &&
      prod.create_ts &&
      prod.create_ts != "null" &&
      prod.create_ts.includes(date)
    );
  });
  const updated = products.filter((prod) => {
    return (
      prod.website_enabled &&
      prod.website_enabled === "true" &&
      prod.update_ts &&
      prod.update_ts != "null" &&
      prod.update_ts.includes(date)
    );
  });
  const deleted = products.filter((prod) => {
    return (
      prod.website_enabled &&
      prod.website_enabled === "true" &&
      prod.delete_ts &&
      prod.delete_ts != "null" &&
      prod.delete_ts.includes(date)
    );
  });

  return [...created, ...updated, ...deleted];
}

getProducts();
