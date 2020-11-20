const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require('fs');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function(req,res) {
    let dog = req.body;
    let cat = JSON.stringify(dog);
    const spawn = require('child_process').spawn;
    const pythonProcess = spawn('python',['test.py', cat]);
        pythonProcess.stdout.on('data', (data) => {
            mainData = data.toString('ascii');
            mainData = mainData.substring(1, mainData.length-3)
            console.log(mainData);
        });

    setTimeout(function(){
        pythonProcess.on('exit', code => {
            console.log(`Exit code is: ${code}`);
        });
        fs.writeFile('savedState.json', "{\"dat\":\"0|0|0|0|0|0|0|0|"+mainData+"\",\"metrics\":"+""+cat+"}", function(err){
            if (err) throw err;
        });
        res.send(mainData);
    }, 2000);
});

app.get('/', function (req, res) {
    let temp;
    fs.readFile('savedState.json', function(err, data){
        if (err) throw err;
        temp = data.toString('ascii');
        console.log('\n'+"HERE" + temp);
        res.send(temp);
    });
});

app.listen(port, () => console.log(`Example app listening on port: ${port}`));
let mainData;
const spawn = require('child_process').spawn;
const pythonProcess = spawn('python',['server/test.py']);
pythonProcess.stdout.on('data', (data) => {
    mainData = data.toString('ascii');
    console.log("=>>>"+data.toString('ascii'));
});
pythonProcess.on('exit', code => {
    console.log(`Exit code is: ${code}`);
});
app.post("/", function(req, res){res.send(mainData)});

app.use("/", router);