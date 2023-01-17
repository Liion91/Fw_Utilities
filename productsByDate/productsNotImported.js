var fs = require("fs");

function getProducts() {
  try {
    const codeProductsReveived = JSON.parse(
      fs.readFileSync("prods_2023-01-10.json")
    );
    const productsMagento = JSON.parse(fs.readFileSync("products_test.json"));
    const productsCode = productsMagento.items.map((prod) => prod.name);

    console.log(codeProductsReveived.length);
    console.log(productsCode.length);

    var difference = codeProductsReveived.filter(
      (x) => !productsCode.includes(x)
    );
    console.log(JSON.stringify(difference));

    process.exit();
  } catch (error) {
    console.log("error");
  }
}

function diffArray(arr1, arr2) {
  function diff(a, b) {
    return a.filter((item) => b.indexOf(item) === -1);
  }

  var diff1 = diff(arr1, arr2); // [0, 1]
  var diff2 = diff(arr2, arr1); // [5, 6]
  return [].concat(diff1, diff2); // [0, 1, 5, 6]
}

getProducts();
