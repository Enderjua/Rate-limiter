const express = require('express');
const app = express();

const rateLimit = require("express-rate-limit");
 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 100 // max 100 req
});
 
app.use(limiter);

app.get('/', (req, res) => {
  res.send('DDoS Protection Online!.');
});

app.listen(3000, () => {
  console.log('listening 3000 port');
});
