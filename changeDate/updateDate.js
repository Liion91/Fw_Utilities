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

function readDir() {
  let basePath = "./files";
  fs.readdir(basePath, function (err, files) {
    if (err) {
      console.log("Unable to scan directory: " + err);
    }
    files.forEach(async function (file) {
      if (file.includes(".txt")) {
        let dataJson;
        try {
          dataJson = JSON.parse(fs.readFileSync(basePath + "/" + file));
        } catch (error) {}

        if (dataJson && dataJson.length > 0) {
          console.log("dataJson OK -> " + file);
          var newFile = basePath + "/" + file.split(".")[0] + ".json";
          var dataUpdated = await updateData(dataJson);
          if (dataUpdated && dataUpdated.length > 0) {
            await saveData(newFile, dataUpdated);
          }
        }
      }
    });
  });
}

readDir();
