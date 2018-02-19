const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const {Wit} = require('node-wit');
const client = new Wit({accessToken: '4HPNRD6HZ5WJFMPTDSIXLUEAXASGQCHV'});
app.set('public', path.join(__dirname, '../client/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api', function (req, res) {
  let data = req.body.data;
  resp=client.message(data, {error: null})
  .then((data) => {
    entity=res.send(data);
  })
  .catch(console.error);
});


app.listen(1000,function(){
    console.log('server started on port 1000...')
});
