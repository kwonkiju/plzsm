const express =require('express');
const app = express();
const port = 3001;
const http = require('http');
const axios = require('axios');

const writeXlsxFile = require("write-excel-file/node");
const fs = require("fs");
const bodyParser = require('body-parser');

const multiparty = require('multiparty');

const xlsx = require('xlsx');
const mysql = require('mysql')

const headerRow = [
    {
      value: "사업자번호",
      fontWeight: "bold",
    },
    {
      value: "납세자상태",
      fontWeight: "bold",
    },
    {
      value: "과세유형메시지",
      fontWeight: "bold",
    },
    {
      value: "폐업일",
      fontWeight: "bold",
    },
    {
        value: "단위과세전환폐업여부",
        fontWeight: "bold",
      },
      {
        value: "최근과세유형전환일자",
        fontWeight: "bold",
      },
      {
        value: "세금계산서적용일자",
        fontWeight: "bold",
      },
  ];
  const finalRowData = [headerRow]
  const row = [
    // "Name"
    {
      type: String,
      value: "",
    },
    {
        type: String,
        value: "",
      },
      {
        type: String,
        value: "",
      },
  
    // "Birth"
    {
      type: Date,
      value: new Date(),
      format: "yyyy/mm/dd",
    },
    {
        type: String,
        value: "",
      },
      {
        type: String,
        value: "",
      },
      {
        type: String,
        value: "",
      },
  ];
  
/*const con =mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'express_db'
});*/

/*con.connect(function(err){
    if(err) throw err;
    console.log('connected!')
})*/
var sql = 'select * from todolist';

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({

    limit: '150mb',

    extended: false,

}));
/*router.get('/' ,(req,res) => {
                                res.header('Access-Control-Allow-Origin', '*');
                                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                                res.header('Access-Control-Allow-Headers', 
                                'Content-Type, Authorization, Content-Length, X-Requested-With');
                                con.query(sql, function (err, result){
                                    if(err) throw err
                                    res.send(result);
                                })

                                console.log('서버통신')
                            });*/

app.post('/', (req, res, next) => {
    console.log('서버통신 post')
    const resData = {};

 

    const form = new multiparty.Form({

        autoFiles: true,

    });

 

    form.on('file', (name, file) => {

        const workbook = xlsx.readFile(file.path);

        const sheetnames = Object.keys(workbook.Sheets);

 

        let i = sheetnames.length;

        const sheetname = sheetnames[0];

        resData["data"] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);

        

    });

 

    form.on('close', () => {
        var i=0;
        var bnoList = [];
        var bno = '';
        console.log(resData)
        while(true){
            

            if(i == resData.data.length-1){
                break;
            }else{
                bno = (resData.data[i].등록번호).replaceAll('-','');
                bnoList.push(bno)
            }
            i++;
        }
        axios.post('https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=%2FrH1%2BoYiAtbCXqXTZyLT0bL8eTGbv9c%2FU3vGHD9MwzkH%2FNOPvjfEG6CrqY2YOSgq6gxhah7x6qt3IssjcWcfqA%3D%3D'
    ,{
      "b_no": bnoList
    })

      .then(res => {
        var j=0;
        while(true){
            if(j == res.data.request_cnt){
                break;
            }else{
            var instantArr = [];
            const row = [
                // "Name"
                {
                  type: String,
                  value: "",
                },
                {
                    type: String,
                    value: "",
                  },
                  {
                    type: String,
                    value: "",
                  },
              
                // "Birth"
                {
                    type: String,
                    value: "",
                  },
                {
                    type: String,
                    value: "",
                  },
                  {
                    type: String,
                    value: "",
                  },
                  {
                    type: String,
                    value: "",
                  },
              ];

            instantArr.push(res.data.data[j].b_no);
            instantArr.push(res.data.data[j].b_stt);
            instantArr.push(res.data.data[j].tax_type);
            instantArr.push(res.data.data[j].end_dt);
            instantArr.push(res.data.data[j].utcc_yn);
            instantArr.push(res.data.data[j].tax_type_change_dt);
            instantArr.push(res.data.data[j].invoice_apply_dt);
            
            console.log(instantArr);
            for(var i=0; i<instantArr.length; i++){
                
                row[i].value = instantArr[i];
                console.log('instantArr'+i)
                if(instantArr.length-1 == i){
                    console.log(row);
                    finalRowData.push(row);
                }
            }
            
            
            j++;
            }
        }
        makeExcel(finalRowData);
      })
      .catch()

    });

    const makeExcel = async (finalRowData) => {
        if (!fs.existsSync("./excel")) {
          // excel 폴더가 존재하지 않는 경우 excel 폴더를 생성한다.
          fs.mkdirSync("./excel");
        }
        await writeXlsxFile(finalRowData, {
          filePath: "./excel/test.xlsx",
        });
      };
    res.send('엑셀요청중');

    form.parse(req);

    

});

app.listen(port, () => console.log('example port {}',port))