var express = require("express");
const router = express.Router();
const storeModels = require("../../models/store");
const industryModels = require("../../models/industry");
const groupModels = require("../../models/group");
const productModels = require("../../models/product");
const promotionModels = require("../../models/promotion");
const employeeModels = require("../../models/employee");
const merchandiseModels = require("../../models/merchandise");
const productUtils = require("../../utils/products");
const promotionUtils = require("../../utils/promotion");
const moment = require("moment")

router.get("/retail-sales", async (req, res) => {
  const stores = await storeModels.all();
  const industries = await industryModels.all();
  const groups = await groupModels.all();

  res.render("reports/report-retail-sales", {
    layout: "main",
    stores,
    industries,
    groups,
  });
});

router.post("/retail-sales", async (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  const params = req.body;
  const stores = await storeModels.all();
  const industries = await industryModels.all();
  const groups = await groupModels.all();
  const productResult = await productModels.sp_BaoCaoBanHangLe(params);
  const paramsPromotion = {
    ...params,
    type: "BANLE",
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
    res.render("products/report-retail-sales", {
      layout: "report",
      params,
      parseResult,
    });
  } else {
    res.render("products/report-retail-sales", { layout: "report", params });
  }
});

router.get("/report-sales-according-to-the-cashier", async (req, res) => {
  const stores = await storeModels.all();
  const employees = await employeeModels.all();

  res.render("reports/report-sales-according-to-the-cashier", {
    layout: "main",
    stores,
    employees,
  });
});

router.post("/report-sales-according-to-the-cashier", async (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  const params = req.body;
  const stores = await storeModels.all();
  const employees = await employeeModels.all();

  const productResult = await productModels.sp_BaoCaoBanHang_TheoNVThuNgan(
    params
  );

  const paramsPromotion = {
    ...params,
  };

  const promotionResult = await promotionModels.sp_KhuyenMai_X2000(
    paramsPromotion
  );

  const storeSelected = stores.find((obj) => obj.ID === params.store);
  params.store_name = "Tất cả cửa hàng";
  if (storeSelected) {
    params.store_name = storeSelected.NAME;
  }

  const employeeSelected = employees.find((obj) => obj.ID === params.employee);
  params.employee_name = "Tất cả nhân viên";
  if (employeeSelected) {
    params.employee_name = employeeSelected.NAME;
  }

  let parseResult = {
    result: productResult,
    metadata: {},
  };

  parseResult.metadata.totalSL_BAN = productUtils.sumTotal(
    productResult,
    "SL_BAN"
  );
  parseResult.metadata.totalCHIETKHAU = productUtils.sumTotal(
    productResult,
    "CHIET_KHAU"
  );
  parseResult.metadata.totalSL_TRA = productUtils.sumTotal(
    productResult,
    "SL_TRA"
  );
  parseResult.metadata.totalVALUE_TRA = productUtils.sumTotal(
    productResult,
    "VALUE_TRA"
  );
  parseResult.metadata.totalTHANHTIEN = productUtils.sumTotal(
    productResult,
    "THANHTIEN"
  );

  parseResult.metadata.totalPROMOTION_COST = promotionUtils.sumAllPromotion(
    promotionResult
  );

  parseResult.metadata.finalValue =
    parseResult.metadata.totalTHANHTIEN -
    parseResult.metadata.totalPROMOTION_COST;

  if (parseResult.result.length > 0) {
    res.render("products/report-sales-according-to-the-cashier", {
      layout: "report",
      params,
      parseResult,
    });
  } else {
    res.render("products/report-sales-according-to-the-cashier", {
      layout: "report",
      params,
    });
  }
});

router.get("/report-general-sales", async (req, res) => {
  const stores = await storeModels.all();
  const industries = await industryModels.all();
  const groups = await groupModels.all();

  res.render("reports/report-general-sales", {
    layout: "main",
    stores,
    industries,
    groups,
  });
});

router.post("/report-general-sales", async (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  const params = req.body;
  const stores = await storeModels.all();
  const industries = await industryModels.all();
  const groups = await groupModels.all();
  const productResult = await productModels.sp_BaoCaoBanHang_TongHop(params);

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

  const parseResult = await productUtils.parseGeneralData(productResult);
  // console.log(parseResult);

  parseResult.metadata.finalValue = parseResult.metadata.totalTHANHTIEN - 0;

  if (parseResult.result.length > 0) {
    res.render("products/report-general-sales", {
      layout: "report",
      params,
      parseResult,
    });
  } else {
    res.render("products/report-general-sales", { layout: "report", params });
  }
});

router.get("/import-export-balance-reports", async (req, res) => {
  const stores = await storeModels.all();
  const industries = await industryModels.all();
  const groups = await groupModels.all();

  res.render("reports/import-export-balance-reports", {
    layout: "main",
    stores,
    industries,
    groups,
  });
});

router.post("/import-export-balance-reports", async (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  const params = req.body;
  const stores = await storeModels.all();
  const industries = await industryModels.all();
  const groups = await groupModels.all();
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
  let productResult = await productModels.sp_CanDoiNXT(params);

  if(params.industry !== "ALL"){
    productResult = productResult.filter(obj => obj.GROUP_ID === params.industry);
  }

  if(params.group !== "ALL"){
    productResult = productResult.filter(obj => obj.DEPT_ID === params.group);
  }

  const storeSelected = stores.find((obj) => obj.ID === params.store);
  params.store_name = "Tất cả cửa hàng";
  if (storeSelected) {
    params.store_name = storeSelected.NAME;
  }

  let parseResult = {
    result: productResult,
    metadata: {},
  };

  parseResult.metadata.totalQTY_BG = productUtils.sumTotal(
    productResult,
    "QTY_BG"
  );
  parseResult.metadata.totalGIA_BG = productUtils.sumTotal(
    productResult,
    "GIA_BG"
  );
  parseResult.metadata.totalQTY_N = productUtils.sumTotal(
    productResult,
    "QTY_N"
  );
  parseResult.metadata.totalGIA_N = productUtils.sumTotal(
    productResult,
    "GIA_N"
  );
  parseResult.metadata.totalQTY_X = productUtils.sumTotal(
    productResult,
    "QTY_X"
  );

  parseResult.metadata.totalGIA_X = productUtils.sumTotal(
    productResult,
    "GIA_X"
  );

  parseResult.metadata.totalQTY = productUtils.sumTotal(
    productResult,
    "QTY"
  );

  parseResult.metadata.totalVALUE = productUtils.sumTotal(
    productResult,
    "VALUE"
  );

  parseResult.metadata.finalValue = parseResult.metadata.totalTHANHTIEN - 0;
  if (parseResult.result.length > 0) {
    res.render("products/import-export-balance-reports", {
      layout: "report",
      params,
      parseResult,
    });
  } else {
    res.render("products/import-export-balance-reports", { layout: "report", params });
  }
});

router.get("/warehouse-card-report", async (req, res) => {
  const stores = await storeModels.all();
  const merchandises = await merchandiseModels.all();

  res.render("reports/warehouse-card-report", {
    layout: "main",
    stores,
    merchandises
  });
});

router.post("/warehouse-card-report", async (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  const params = req.body;
  const stores = await storeModels.all();
  const productResult = await productModels.sp_TheKho(params);
  productResult.forEach(element => {
    element.date = moment(new Date(element.TRX_DATE)).format("DD/MM/YYYY");
  });

  const storeSelected = stores.find((obj) => obj.ID === params.store);
  params.store_name = "Tất cả cửa hàng";
  if (storeSelected) {
    params.store_name = storeSelected.NAME;
  }

  let parseResult = {
    result: productResult,
    metadata: {},
  };

  parseResult.metadata.totalQTY_IN = productUtils.sumTotal(
    productResult,
    "QTY_IN"
  );
  parseResult.metadata.totalQTY_OUT = productUtils.sumTotal(
    productResult,
    "QTY_OUT"
  );
  parseResult.metadata.totalQTY = parseResult.metadata.totalQTY_IN - parseResult.metadata.totalQTY_OUT;

  parseResult.metadata.finalValue = parseResult.metadata.totalTHANHTIEN - 0;
  if (parseResult.result.length > 0) {
    res.render("products/warehouse-card-report", {
      layout: "report",
      params,
      parseResult,
    });
  } else {
    res.render("products/warehouse-card-report", { layout: "report", params });
  }
});

module.exports = router;
