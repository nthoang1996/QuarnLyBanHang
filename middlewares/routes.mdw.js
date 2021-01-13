const restrict = require('./auth.mdw');
module.exports = function(app) {
    app.use('/reports/products', restrict, require('../routes/reports/products'));
}