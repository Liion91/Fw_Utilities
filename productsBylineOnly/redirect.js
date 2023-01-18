const base = "url/macchinari?searchKeyword=";
let jsonFile = require("./prods_filtered_prod.json");
let fs = require("fs");

const jsonUrls = JSON.stringify(jsonFile.map((el) => base + el));
fs.writeFile("myJsonfileProd.json", jsonUrls, "utf8", (err) => {
  if (err) {
    throw err;
  }
  console.log("JSON data is saved.");
});

