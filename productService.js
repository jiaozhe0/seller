var express = require('express');
var config = require('./config/index');
var port = process.env.PORT || config.build.port;
var app = express();
var router = express.Router();

// 同步模版，
router.get('/', function(req, res, next) {
  req.url = '/index.html';
  next();
});
app.use(router);

var appData = require('./data.json');
// 相当于数据库的数据
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
var apiRoutes = express.Router();

apiRoutes.get('/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  });
});

apiRoutes.get('/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  });
});

apiRoutes.get('/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use('/api', apiRoutes);
app.use(express.static('./dist'));
module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
  console.log('让我们红尘作伴，活得潇潇洒洒');
});

