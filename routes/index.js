var express = require('express');
var router = express.Router();
const creds = require("../credentials/credentials.json");

/* GET home page. */
router.all('*', function (req, res, next) {
  console.log(`url:\n${req.url}\noriginal-url:\n${req.originalUrl}\nbase-url:\n${req.baseUrl}\nbody:\n${JSON.stringify(req.body, null, 2)}\nheaders:\n${JSON.stringify(req.headers, null, 2)}`);

  const urlSplit = req.originalUrl.split('/');
  if (urlSplit && urlSplit.length > 0) {
    const urlRoute = urlSplit[1];
    if (urlRoute) {
      const targetUrlCred = creds.find(c => c['enpoint-route'] === urlRoute);
      if (targetUrlCred) {

        const targetUrl = [targetUrlCred['oAuth-credentials']['base-url'], ...urlSplit.splice(2)].join('/');
        var targetHeaders = {...req.headers};
        delete targetHeaders["authorization"];

        res.send(`url:(${targetUrl})\nbody:${JSON.stringify(req.body, null, 2)}\nheaders:(${JSON.stringify(targetHeaders, null, 2)})`);
        return;
      }
    }
  }

  res.send(`couldn't find the target.`);
});

module.exports = router;
