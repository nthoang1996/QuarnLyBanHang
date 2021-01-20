const express = require("express");
const session = require("express-session");
const handlebars_sections = require("express-handlebars-sections");
const app = express();
const port = 3000;
const handlebars = require("express-handlebars");

const storeModels = require("./models/store");
const industryModels = require("./models/industry");
const groupModels = require("./models/group");
const productModels = require("./models/product");
const promotionModels = require("./models/promotion");
const productUtils = require("./utils/products");
const promotionUtils = require("./utils/promotion");
const numeral = require("numeral");
const restrict = require("./middlewares/auth.mdw");
//Sets our app to use the handlebars engine
//instead of app.set('view engine', 'handlebars');
app.set("view engine", "hbs");

//instead of app.engine('handlebars', handlebars({
app.engine(
  "hbs",
  handlebars({
    layoutsDir: __dirname + "/views/layouts",
    //new configuration parameter
    extname: "hbs",
    helpers: {
      section: handlebars_sections(),
      yearDatas: function (startYear, endYear, block) {
        var accum = "";
        for (var i = startYear; i < endYear; ++i) accum += block.fn(i);
        return accum;
      },
      format: (val) => numeral(val).format("0,0"),
      inc: (value) => parseInt(value)+ 1,
      json: data => JSON.stringify(data),
    },
  })
);

app.use(express.static("public"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
require("./middlewares/locals.mdw")(app);
require('./middlewares/routes.mdw')(app);

app.get("/", restrict, async (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  const stores = await storeModels.all();
  const industries = await industryModels.all();
  const groups = await groupModels.all();

  res.render("home", { layout: "main", stores, industries, groups });
});

app.post("/", restrict, async (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  const params = req.body;
  const stores = await storeModels.all();
  const industries = await industryModels.all();
  const groups = await groupModels.all();
  const productResult = await productModels.sp_BaoCaoBanHangSi(params);
  const paramsPromotion = {
    ...params,
    type: "BANSI",
  };
  const promotionResult = await promotionModels.sp_KhuyenMai_X2000(
    paramsPromotion
  );

  const storeSelected = stores.find((obj) => obj.ID === params.store);
  params.store_name = "Tất cả cửa hàng";
  if (storeSelected) {
    params.store_name = storeSelected.NAME;
  }

  const industrySelected = industries.find((obj) => obj.ID === params.industry);
  params.industry_name = "Tất cả ngành hàng";
  if (industrySelected) {
    params.industry_name = industrySelected.NAME;
  }

  const groupSelected = groups.find((obj) => obj.ID === params.group);
  params.group_name = "Tất cả nhóm hàng";
  if (groupSelected) {
    params.group_name = groupSelected.NAME;
  }

  const parseResult = await productUtils.parseData(productResult);
  parseResult.metadata.totalPROMOTION_COST = promotionUtils.sumAllPromotion(
    promotionResult
  );

  parseResult.metadata.finalValue =
    parseResult.metadata.totalTHANHTIEN -
    parseResult.metadata.totalPROMOTION_COST;

  if (parseResult.result.length > 0) {
    res.render("products/report", { layout: "report", params, parseResult });
  } else {
    res.render("products/report", { layout: "report", params });
  }
});

app.get("/login", (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  res.render("login", { layout: false });
});

app.get("/sign_out", (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  req.session.isAuthenticated = false;
  res.redirect("/login");
});

app.post("/login", (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  const { login, password } = req.body;
  let errorMsg = "";
  if (login !== "admin") {
    errorMsg = "Tài khoản không tồn tại";
    return res.render("login", { layout: false, error: errorMsg });
  }
  if (password !== "1") {
    errorMsg = "Sai mật khẩu";
    return res.render("login", { layout: false, error: errorMsg });
  }
  req.session.isAuthenticated = true;
  const url = req.query.retUrl || '/';
  return res.redirect(url);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.render('error500', { layout: false });
})

app.use((req, res, next) => {
  res.render('error404', { layout: false });
})

app.listen(port, () => console.log(`App listening to port ${port}`));
