const download = require("download-git-repo");
const fs = require("fs");

const dist = __dirname + "/ant-design";
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist);
}

console.log("Downloading... This may take a few minutes");
download("ant-design/ant-design", dist, function(err) {
  console.log(err ? "Error" : "Success");
});
