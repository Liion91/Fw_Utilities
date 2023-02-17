var fs = require("fs");

function getProducts() {
  try {
    const allProducts = JSON.parse(fs.readFileSync("abstract_product.json"));
    // console.log(allProducts.length);

    const productsEnabled = allProducts.filter(
      (prod) => prod.delete_ts === "null" && prod.website_enabled === "true"
    );
    // console.log(productsEnabled.length);

    const allProductsLines = JSON.parse(
      fs.readFileSync("product_line_item.json")
    );
    // console.log(allProductsLines.length);

    const productsLineEnabled = allProductsLines.filter(
      (prod) => prod.delete_ts === "null"
    );
    // console.log(productsLineEnabled.length);

    let prodcuts = [];

    productsEnabled.map((prod) => {
      let children = [];
      productsLineEnabled.map((prodLine) => {
        if (prodLine.product_line_id === prod.id) {
          let childCode = productsEnabled.find(
            (elem) => elem.id === prodLine.product_id
          );
          children.push({
            childCode: childCode && childCode.product_code ? childCode.product_code : prodLine.product_id,
            order: prodLine.order_,
            lineOnly: prodLine.is_line_only,
            isDefault: prodLine.is_default,
          });
        }
      });
      if (children.length > 0)
        prodcuts.push({
          objParentId: prod.id,
          objSku: prod.product_code,
          children: children,
        });
    });

    fs.writeFileSync("prodsLineEnable" + ".json", JSON.stringify(prodcuts));

    console.log(prodcuts.length);
    process.exit();
  } catch (error) {
    console.log("error", error.message);
  }
}

getProducts();
