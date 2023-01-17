var fs = require("fs");

function test() {
  let data = [];
  const arrayData = JSON.parse(
    fs.readFileSync("./files/abstract_product.json", "utf8")
  );
  let i = 0;
  arrayData.forEach((element) => {
    if (i < 3001) {
      data.push(element);
      i++;
    }
  });
  console.log(data.length);
  fs.writeFile("test.json", JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("Data written to file -> test.json");
  });
}

test();
