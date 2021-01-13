const mssql = require("mssql/msnodesqlv8");

const config = {
//   user: "TestUser",
//   password: "123456",
  server: "localhost\\MSSQLSERVER01", // You can use 'localhost\\instance' to connect to named instance
  database: "TPVPOS_S_NEW",
  driver: 'msnodesqlv8',
  options: {
    encrypt: false,
    trustedConnection: true
  },
  port : 1433
};

// promise style:
const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on("error", (err) => {
  console.log(err);
});

module.exports = {
  load: async (sql) => {
    let result = [];
    await poolConnect
      .then(async (pool) => {
        await pool
          .request()
          .query(sql)
          .then((res) => {
            if (res.recordset) {
              result = res.recordset;
            } else {
              return [];
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  },
  call_procedure: async (procedure_name, params) => {
    let result = [];
    await poolConnect
      .then(async (pool) => {
        const req = pool.request();

        params.forEach(function(param) {
            req.input(param.name, param.type, param.value);
        });
        
        let resultQuery = await req.execute(procedure_name);
        if(resultQuery.recordset){
            result = resultQuery.recordset
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  },
};
