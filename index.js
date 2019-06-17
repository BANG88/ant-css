const download = require("download-git-repo");
const fs = require("fs");
const path = require("path");
const less = require("less");
const LessPluginCleanCSS = require("less-plugin-clean-css");

const mapping = {
  // for base style
  "": "AntDesign.BaseComponent",
  button: "AntDesign.Button",
  "date-picker": "AntDesign.DatePicker",
  input: "AntDesign.Input",
  notification: "AntDesign.Notification",
  skeleton: "AntDesign.Skeleton",
  "time-picker": "AntDesign.TimePicker",
  calendar: "AntDesign.Calendar",
  descriptions: "AntDesign.",
  "input-number": "AntDesign.InputNumber",
  "page-header": "AntDesign.PageHeader",
  slider: "AntDesign.Slider",
  timeline: "AntDesign.Timeline",
  affix: "AntDesign.Affix",
  card: "AntDesign.Card",
  divider: "AntDesign.Divider",
  layout: "AntDesign.Layout",
  pagination: "AntDesign.Pagination",
  spin: "AntDesign.Spin",
  tooltip: "AntDesign.Tooltip",
  alert: "AntDesign.Alert",
  carousel: "AntDesign.Carousel",
  drawer: "AntDesign.Drawer",
  list: "AntDesign.List",
  statistic: "AntDesign.Statistic",
  transfer: "AntDesign.Transfer",
  anchor: "AntDesign.Anchor",
  cascader: "AntDesign.Cascader",
  dropdown: "AntDesign.Dropdown",
  popover: "AntDesign.Popover",
  steps: "AntDesign.Steps",
  tree: "AntDesign.Tree",
  "auto-complete": "AntDesign.AutoComplete",
  checkbox: "AntDesign.Checkbox",
  empty: "AntDesign.Empty",
  mention: "AntDesign.Mention",
  progress: "AntDesign.Progress",
  "tree-select": "AntDesign.TreeSelect",
  avatar: "AntDesign.Avatar",
  form: "AntDesign.Form",
  mentions: "AntDesign.Mentions",
  radio: "AntDesign.Radio",
  switch: "AntDesign.Switch",
  typography: "AntDesign.Typography",
  "back-top": "AntDesign.BackTop",
  collapse: "AntDesign.Collapse",
  grid: "AntDesign.Grid",
  menu: "AntDesign.Menu",
  rate: "AntDesign.Rate",
  table: "AntDesign.Table",
  upload: "AntDesign.Upload",
  badge: "AntDesign.Badge",
  comment: "AntDesign.Comment",
  // icon: "AntDesign.Icon",
  message: "AntDesign.Message",
  tabs: "AntDesign.Tabs",
  breadcrumb: "AntDesign.Breadcrumb",
  modal: "AntDesign.Modal",
  select: "AntDesign.Select",
  tag: "AntDesign.Tag"
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

function convert() {
  for (const m in mapping) {
    if (mapping.hasOwnProperty(m)) {
      const element = mapping[m];
      if (!element) continue;
      lessToCss(m, element);
    }
  }
}
function fetchAntDesign(cb) {
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
    cb && cb();
  });
}

const args = process.argv;

if (args && args[2] === "--skip") {
  convert();
} else {
  fetchAntDesign(convert);
}
