const download = require("download-git-repo");
const fs = require("fs");
const path = require("path");
const less = require("less");
const LessPluginCleanCSS = require("less-plugin-clean-css");

const mapping = {
  // for base style
  "": "AntDesign.BaseComponent",
  button: "AntDesign.Button",
  "date-picker": "",
  input: "",
  notification: "",
  skeleton: "",
  "time-picker": "",
  calendar: "",
  descriptions: "",
  "input-number": "",
  "page-header": "",
  slider: "",
  timeline: "",
  affix: "",
  card: "",
  divider: "",
  layout: "",
  pagination: "",
  spin: "",
  tooltip: "",
  alert: "",
  carousel: "",
  drawer: "",
  list: "",
  statistic: "",
  transfer: "",
  anchor: "",
  cascader: "",
  dropdown: "",
  popover: "",
  steps: "",
  tree: "",
  "auto-complete": "",
  checkbox: "",
  empty: "",
  mention: "",
  progress: "",
  "tree-select": "",
  avatar: "",
  form: "",
  mentions: "",
  radio: "",
  switch: "",
  typography: "",
  "back-top": "",
  collapse: "",
  grid: "",
  menu: "",
  rate: "",
  table: "",
  upload: "",
  badge: "",
  comment: "",
  icon: "",
  message: "",
  tabs: "",
  breadcrumb: "",
  modal: "",
  select: "",
  tag: ""
};

function lessToCss(component, cssOutput) {
  cleanCSSPlugin = new LessPluginCleanCSS();
  console.log("[current]: %s", component);
  const styleDist = "./ant-design/components/" + component + "/style/";
  less
    .render(fs.readFileSync(styleDist + "index.less", "utf-8"), {
      plugins: [cleanCSSPlugin],
      javascriptEnabled: true,
      paths: ["./ant-design/components/style/", styleDist],
      cleanCss: true
    })
    .then(
      function(output) {
        const dist = path.join("../src/", cssOutput, "content");
        if (fs.existsSync(dist)) {
          fs.writeFileSync(path.join(dist, "style.css"), output.css);
          console.log("[%s] done", component);
        }
      },
      function(error) {
        console.log("[%s] error: %s ", component, error);
      }
    );
}

function fetchAntDesign() {
  const dist = __dirname + "/ant-design";

  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
  }
  console.log("Downloading ant-design... This may take a few minutes");
  download("ant-design/ant-design", dist, function(err) {
    if (err) {
      console.log(
        "Download ant-design failed. please check your network connection and try again later"
      );
      return;
    }

    for (const m in mapping) {
      if (mapping.hasOwnProperty(m)) {
        const element = mapping[m];
        if (!element) continue;
        lessToCss(m, element);
      }
    }
  });
}

fetchAntDesign();

