import express from 'express'
import cors from 'cors'
import busboy from 'connect-busboy'
import fs from 'fs-extra'
import { parse } from 'csv-parse'
import url from 'url'
import https from 'https'
import sizeOf from 'image-size'

const app = express()

app.use(cors())
app.use(busboy())

app.get('/products/', (req, res) => {
  let csvData=[];
  fs.createReadStream(__dirname + '/upload/products.csv')
    .pipe(parse({delimiter: ';'}))
    .on('data', function(csvrow) {
      console.log(csvrow);
      const options = url.parse(csvrow[2]);
      csvData.push({"id": csvrow[0], "name": csvrow[1], "picture": {"url": csvrow[2], "width": "", "height": ""}});
      // https.get(options, res => {
      //   const chunks = [];
      //   res.on('data', chunk => {
      //     chunks.push(chunk);
      //   }).on('end', () => {
      //     const buffer = Buffer.concat(chunks);
      //     const detail = sizeOf(buffer);
      //     console.log(detail);
      //     csvData.push({"id": csvrow[0], "name": csvrow[1], "picture": {"url": csvrow[2], "width": detail.width, "height": detail.height}});
      //   })
      // })
    })
    .on('end',function() {
      //do something with csvData
      console.log('This is csv Data', csvData);
      csvData.shift();
      res.send(csvData);
    });
})

app.post('/upload', (req, res) => {
  console.log('rrrrrrrrr', req);
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
      console.log("Uploading: " + filename);

      //Path where image will be uploaded
      fstream = fs.createWriteStream(__dirname + '/upload/' + 'products.csv');
      file.pipe(fstream);
      fstream.on('close', function () {    
          console.log("Upload Finished of " + filename);
          res.send('Success!');
      });
  });
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server started on port ${port}: http://localhost:${port}`)
})
