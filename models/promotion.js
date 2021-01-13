const db = require('../utils/db');
const mssql = require("mssql/msnodesqlv8");
const moment = require('moment')

module.exports = {
    sp_KhuyenMai_X2000:(input) =>  {
        let params = [
            {
                name: 'TuNgay',
                type: mssql.Date,
                value: moment(input.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            },
            {
                name: 'DenNgay',
                type: mssql.Date,
                value:  moment(input.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            },
            {
                name: 'LOC_ID',
                type: mssql.VarChar(10),
                value: input.store
            },
            {
                name: 'LOAI',
                type: mssql.VarChar(50),
                value: input.employee
            }
        ]
       return db.call_procedure('sp_KhuyenMai_X2000', params)
    },
}