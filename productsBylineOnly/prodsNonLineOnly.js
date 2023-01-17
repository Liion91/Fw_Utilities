var fs = require("fs");

function getProducts() {
  try {
    const products = JSON.parse(fs.readFileSync("prod_Ok_Prod.json"));
    console.log(products.items.length);

    const filtered = filterProducts(products.items);

    const codes = filtered.map((prod) => prod.name);

    fs.writeFileSync("prods_filtered_prod" + ".json", JSON.stringify(codes));

    console.log(filtered.length);
    process.exit();
  } catch (error) {
    console.log("error");
  }
}

function filterProducts(products) {
  const created = products.filter((prod) => {
    let key = prod.custom_attributes && Object.keys(prod.custom_attributes);
    return (
      prod.custom_attributes.length === 0 ||
      (prod.custom_attributes &&
        prod.custom_attributes[key] &&
        prod.custom_attributes[key].value === false.toString())
    );
  });

  return [...created];
}

getProducts();
