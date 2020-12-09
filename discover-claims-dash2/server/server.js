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
    try {
        let val = req.body.val;
        let col = req.body.col;
        let colActual = col.dataField;
        let row = req.body.row;
        let metrics = req.body.met;
        val = JSON.stringify(val);
        row = JSON.stringify(row);
        colActual = JSON.stringify(colActual);
        const spawn = require('child_process').spawn;
        console.log(colActual);
        const pythonProcess = spawn('python', ['test.py', val, row, colActual]);
        pythonProcess.stdout.on('data', (data) => {
            mainData = data.toString('ascii');
            mainData = mainData.substring(0, mainData.length - 2)
            console.log(mainData);
            let ar = mainData.split('|');
            let counter1 = 0;
            for (let i = 0; i < metrics.length; i++) {
                metrics[i].Actual = ar[267 + i + counter1]
                metrics[i].Actual__1 = ar[268 + i + counter1]
                counter1 += 1;
            }
            let counter2 = 0;
            for (let i = 46; i < metrics.length; i++){
                if(counter2 < 6){
                    metrics[i].Actual = 'NA';
                    metrics[i].Actual__1 = 'NA';
                }else{
                    metrics[i].Actual = 'to develop @ Phase 3';
                    metrics[i].Actual__1 = 'to develop @ Phase 3';
                }
                counter2 += 1;
            }
        });

        setTimeout(function () {
            pythonProcess.on('exit', code => {
                console.log(`Exit code is: ${code}`);
            });
            fs.writeFile('savedState.json', "{\"dat\":\"0|0|0|0|0|0|0|0|" + mainData + "\",\"metrics\":" + "" + JSON.stringify(metrics) + "}", function (err) {
                if (err) throw err;
            });
            res.json({main: mainData, met: metrics});
        }, 2000);
    } catch(error){
        console.error(error);
    }
});

app.get('/', function (req, res) {
    let temp;
    fs.readFile('savedState.json', function(err, data){
        if (err) throw err;
        temp = data.toString('ascii');
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