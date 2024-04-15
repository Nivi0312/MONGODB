var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require('mongoose')
const MongoClient=require('mongodb').MongoClient
const app = express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
mongoose.connect('mongodb://localhost:27017/student');
var db = mongoose.connection
db.on('error', ()=>console.log("Connection Error"))
db.once('open',()=>console.log("Connection succeeded"))
app.post('/sign_up', (req, res)=> {
    var name = req.body.name;
    var course = req.body.course;
    var rollno = req.body.rollno;
    var i1 = req.body.i1;
    var i2 = req.body.i2;
    var i3 = req.body.i3;
    var total = req.body.total;
    var avg = req.body.avg;

    var data = {
        "name": name,
        "course": course,
        "rollno": rollno,
        "i1": i1,
        "i2": i2,
        "i3": i3,
        "total": total,
        "avg": avg
    };

    db.collection('marks').insertOne(data, (err, collection)=> {
        if (err) 
        {
            throw err;
        }
        console.log("Record inserted Successfully");
    });
//window.alert("Insertd successfully");
    return res.redirect('success.html');
});

app.get('/', (req, res)=> {
    res.get({
        'Allow-access-Allow-Origin': '*'
    });
    return res.redirect('index.html');
}).listen(3000);
console.log("Listening to port 3000")
app.get('/api/marks',(req,res)=>{
    database.collection('marks').find({}).toArray((er,result)=>{
        if(er)
            throw er
        res.send(result)
    })
})
app.listen(8080,()=>{
    MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true},(err,result)=>{
        if(err)
           throw err
        database=result.db('student')
        console.log("Connection successful")
    })
})


