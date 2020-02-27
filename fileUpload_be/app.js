const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require('multer');
const mongoose = require('mongoose');
const config = require('./config/database')
const Up = require('./upload');
const fs = require('fs');


mongoose.connect(config.database)
mongoose.connection.on('connected',() =>{
  console.log('Connected to database ' + config.database);
})

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("The server started on port 3000 !!!!!!");
});

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })



app.get("/", (req, res) => {
    res.send(
      `<h1 style='text-align: center'>
            Wellcome to FunOfHeuristic 
            <br><br>
            <b style="font-size: 182px;">😃👻</b>
        </h1>`
    );
  });

  app.post('/file', upload.single('file'), (req, res, next) => {

    const newFile = new Up();
    const buff = fs.readFileSync(req.file.path)
    const base64data = buff.toString('base64');
     newFile.img.data = base64data;
     newFile.filename = req.file.originalname;
     newFile.save();


    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);

   
  })

  app.get('/upload',(req,res) =>
  {
    Up.find({}).lean().exec((err,upload)=>{
      res.end(JSON.stringify(upload))
    });
   
  });





