var fs = require("fs");
var path = require("path");

async function updateData(datas) {
  return new Promise((resolve, reject) => {
    try {
      var data = [];
      for (i in datas) {
        var obj = datas[i];
        if (datas[i]) {
          var obj = datas[i];
          if (
            obj &&
            obj.update_ts &&
            obj.update_ts !== undefined &&
            obj.update_ts !== null
          ) {
            // console.log(obj.update_ts);
            obj.update_ts = "2022-09-25 12:00:00.000";
          }
          data.push(obj);
        }
      }
      resolve(data);
      // console.log("Finish Replace");
      // return data;
    } catch (error) {
      // console.log("Not update!");
      // console.log(error);
      // return null;
      resolve();
    }
  });
}

async function saveData(fileName, data) {
  try {
    fs.writeFile(fileName, JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log("Data written to file -> " + fileName);
    });
  } catch (error) {
    console.log("Not saved!");
    console.log(error);
  }
}

function getCategories() {
  try {
    const defaltCat = JSON.parse(fs.readFileSync("./categories.json"));
    const childrenDefCat = defaltCat.children_data;
    childrenDefCat.forEach((baseCat) => {
      if (baseCat.name === "Macchinari") {
        const baseCathChildren = baseCat.children_data;
        baseCathChildren.forEach((childrenCat) => {
          if (childrenCat.product_count > 0 && childrenCat.name !== "Gruppi") {
            console.log(childrenCat.name, childrenCat.id);
            const childrenSubCat = childrenCat.children_data;
            childrenSubCat.forEach((subCat) => {
              if (subCat.product_count > 0) {
                console.log(subCat.name, subCat.product_count);
              }
            });
          }
        });
      }
    });
    process.exit();
  } catch (error) {}
}

getCategories();
