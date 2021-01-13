module.exports = {
  parseData: async (data) => {
    let result = [];
    let totalQTY = 0;
    let totalVAT = 0;
    let totalDISC_AMT = 0;
    let totalTHANHTIEN = 0;

    data.forEach((element) => {
      console.log(element);
      totalQTY += element.QTY;
      totalVAT += element.VAT;
      totalDISC_AMT += element.DISC_AMT;
      totalTHANHTIEN += element.THANHTIEN;
      const indexIndustry = result.findIndex(
        (obj) => obj.NAME == element.GROUP_NAME
      );
      if (indexIndustry >= 0) {
        if (!result[indexIndustry].group) {
          result[indexIndustry].group = [];
        }
        const indexGroup = result[indexIndustry].group.findIndex(
          (obj) => obj.NAME == element.DEPT_NAME
        );
        if (indexGroup >= 0) {
          if (!result[indexIndustry].group[indexGroup].data) {
            result[indexIndustry].group[indexGroup].data = [];
          }
          result[indexIndustry].group[indexGroup].data.push(element);
          result[indexIndustry].group[indexGroup].QTY += element.QTY;
          result[indexIndustry].group[indexGroup].VAT += element.VAT;
          result[indexIndustry].group[indexGroup].DISC_AMT += element.DISC_AMT;
          result[indexIndustry].group[indexGroup].THANHTIEN +=
            element.THANHTIEN;
        } else {
          result[indexIndustry].group.push({
            ID: element.DEPT_ID,
            NAME: element.DEPT_NAME,
            QTY: element.QTY,
            THANHTIEN: element.THANHTIEN,
            DISC_AMT: element.DISC_AMT,
            VAT: element.VAT,
            data: [element],
          });
        }
        result[indexIndustry].QTY += element.QTY;
        result[indexIndustry].THANHTIEN += element.THANHTIEN;
        result[indexIndustry].VAT += element.VAT;
        result[indexIndustry].DISC_AMT += element.DISC_AMT;
      } else {
        result.push({
          NAME: element.GROUP_NAME,
          group: [
            {
              ID: element.DEPT_ID,
              NAME: element.DEPT_NAME,
              data: [element],
              QTY: element.QTY,
              THANHTIEN: element.THANHTIEN,
              DISC_AMT: element.DISC_AMT,
              VAT: element.VAT,
            },
          ],
          QTY: element.QTY,
          THANHTIEN: element.THANHTIEN,
          DISC_AMT: element.DISC_AMT,
          VAT: element.VAT,
        });
      }
    });
    const dataContainer = {
      metadata: {
        totalQTY,
        totalVAT,
        totalDISC_AMT,
        totalTHANHTIEN,
      },
      result,
    };

    return dataContainer;
  },
  sumTotal: (data, fieldName) => {
    let rs = 0;
    data.forEach((element) => {
      rs += element[fieldName];
    });
    return rs;
  },
  parseGeneralData: async (data) => {
    let result = [];
    let totalSL_BAN = 0;
    let totalTHUE_BAN = 0;
    let totalCHIET_KHAU = 0;
    let totalVALUE_BAN = 0;
    let totalSL_TRA = 0;
    let totalTHUE_TRA = 0;
    let totalVALUE_TRA = 0;
    let totalTHANHTIEN = 0;

    console.log(data);

    data.forEach((element) => {
      totalSL_BAN += element.SL_BAN;
      totalTHUE_BAN += element.THUE_BAN;
      totalCHIET_KHAU += element.CHIET_KHAU;
      totalVALUE_BAN += element.VALUE_BAN;
      totalSL_TRA += element.SL_TRA;
      totalTHUE_TRA += element.THUE_TRA;
      totalVALUE_TRA += element.VALUE_TRA;
      totalTHANHTIEN += element.THANHTIEN;
      const indexIndustry = result.findIndex(
        (obj) => obj.NAME == element.GROUP_NAME
      );
      if (indexIndustry >= 0) {
        if (!result[indexIndustry].group) {
          result[indexIndustry].group = [];
        }
        const indexGroup = result[indexIndustry].group.findIndex(
          (obj) => obj.NAME == element.DEPT_NAME
        );
        if (indexGroup >= 0) {
          if (!result[indexIndustry].group[indexGroup].data) {
            result[indexIndustry].group[indexGroup].data = [];
          }
          result[indexIndustry].group[indexGroup].data.push(element);
          result[indexIndustry].group[indexGroup].SL_BAN += element.SL_BAN;
          result[indexIndustry].group[indexGroup].CHIET_KHAU +=
            element.CHIET_KHAU;
          result[indexIndustry].group[indexGroup].THUE_BAN += element.THUE_BAN;
          result[indexIndustry].group[indexGroup].VALUE_BAN +=
            element.VALUE_BAN;
          result[indexIndustry].group[indexGroup].DONGIA += element.DONGIA;
          result[indexIndustry].group[indexGroup].SL_TRA += element.SL_TRA;
          result[indexIndustry].group[indexGroup].THUE_TRA += element.THUE_TRA;
          result[indexIndustry].group[indexGroup].VALUE_TRA +=
            element.VALUE_TRA;
          result[indexIndustry].group[indexGroup].THANHTIEN +=
            element.THANHTIEN;
        } else {
          result[indexIndustry].group.push({
            ID: element.DEPT_ID,
            NAME: element.DEPT_NAME,
            SL_BAN: element.SL_BAN,
            THANHTIEN: element.THANHTIEN,
            CHIET_KHAU: element.CHIET_KHAU,
            THUE_BAN: element.THUE_BAN,
            VALUE_BAN: element.VALUE_BAN,
            DONGIA: element.DONGIA,
            SL_TRA: element.SL_TRA,
            THUE_TRA: element.THUE_TRA,
            VALUE_TRA: element.VALUE_TRA,
            data: [element],
          });
        }
        result[indexIndustry].SL_BAN += element.SL_BAN;
        result[indexIndustry].THANHTIEN += element.THANHTIEN;
        result[indexIndustry].CHIET_KHAU += element.CHIET_KHAU;
        result[indexIndustry].THUE_BAN += element.THUE_BAN;
        result[indexIndustry].VALUE_BAN += element.VALUE_BAN;
        result[indexIndustry].DONGIA += element.DONGIA;
        result[indexIndustry].SL_TRA += element.SL_TRA;
        result[indexIndustry].THUE_TRA += element.THUE_TRA;
        result[indexIndustry].VALUE_TRA += element.VALUE_TRA;
      } else {
        result.push({
          NAME: element.GROUP_NAME,
          group: [
            {
              ID: element.DEPT_ID,
              NAME: element.DEPT_NAME,
              data: [element],
              SL_BAN: element.SL_BAN,
              THANHTIEN: element.THANHTIEN,
              CHIET_KHAU: element.CHIET_KHAU,
              THUE_BAN: element.THUE_BAN,
              VALUE_BAN: element.VALUE_BAN,
              DONGIA: element.DONGIA,
              SL_TRA: element.SL_TRA,
              THUE_TRA: element.THUE_TRA,
              VALUE_TRA: element.VALUE_TRA,
            },
          ],
          SL_BAN: element.SL_BAN,
          THANHTIEN: element.THANHTIEN,
          CHIET_KHAU: element.CHIET_KHAU,
          THUE_BAN: element.THUE_BAN,
          VALUE_BAN: element.VALUE_BAN,
          DONGIA: element.DONGIA,
          SL_TRA: element.SL_TRA,
          THUE_TRA: element.THUE_TRA,
          VALUE_TRA: element.VALUE_TRA,
        });
      }
    });

    const dataContainer = {
      metadata: {
        totalSL_BAN,
        totalTHUE_BAN,
        totalCHIET_KHAU,
        totalVALUE_BAN,
        totalSL_TRA,
        totalTHUE_TRA,
        totalVALUE_TRA,
        totalTHANHTIEN,
      },
      result,
    };

    return dataContainer;
  },
};
