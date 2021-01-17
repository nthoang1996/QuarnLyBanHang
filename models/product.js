const db = require('../utils/db');
const mssql = require("mssql");
const moment = require('moment')

module.exports = {
    sp_BaoCaoBanHangSi:(input) =>  {
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
                name: 'GROUP_ID',
                type: mssql.VarChar(50),
                value: input.industry
            },
            {
                name: 'DEPT_ID',
                type: mssql.VarChar(50),
                value: input.group
            }
        ]
       return db.call_procedure('sp_BaoCaoBanHangSi', params)
    },

    sp_BaoCaoBanHangLe:(input) =>  {
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
                name: 'GROUP_ID',
                type: mssql.VarChar(50),
                value: input.industry
            },
            {
                name: 'DEPT_ID',
                type: mssql.VarChar(50),
                value: input.group
            }
        ]
       return db.call_procedure('sp_BaoCaoBanHangLe', params)
    },

    sp_BaoCaoBanHang_TheoNVThuNgan:(input) =>  {
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
                name: 'CLERK_ID',
                type: mssql.VarChar(50),
                value: input.employee
            }
        ]
       return db.call_procedure('sp_BaoCaoBanHang_TheoNVThuNgan', params)
    },

    sp_BaoCaoBanHang_TongHop:(input) =>  {
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
                name: 'GROUP_ID',
                type: mssql.VarChar(50),
                value: input.industry
            },
            {
                name: 'DEPT_ID',
                type: mssql.VarChar(50),
                value: input.group
            }
        ]
       return db.call_procedure('sp_BaoCaoBanHang_TongHop', params)
    },

    sp_CanDoiNXT:(input) =>  {
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
                name: 'GROUP_ID',
                type: mssql.VarChar(50),
                value: input.industry
            },
            {
                name: 'DEPT_ID',
                type: mssql.VarChar(50),
                value: input.group
            }
        ]
       return db.call_procedure('sp_CanDoiNXT', params)
    },

    sp_TheKho:(input) =>  {
        console.log(input);
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
                name: 'ITEM_ID',
                type: mssql.VarChar(50),
                value: input.merchandise
            },
        ]
       return db.call_procedure('sp_TheKho', params)
    },
}