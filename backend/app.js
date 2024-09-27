const express = require('express');
const cors = require('cors');
const {connectToDb, getDb} = require('./db');
const {ObjectId} = require('mongodb');

// init app & middleware
const app = express()
const port = 3000;

app.use(cors());
app.use(express.json());



function Listen(){
    app.listen(port, () => {
        console.log(`app listening on port ${port}`);            
    })
}

// db connection
let db;
connectToDb(err => {
    if (!err){        
        app.listen(port, () => {
            console.log(`StudentExpense app listening on port ${port}`);            
        })
        db = getDb()
    }
})

app.get('/', (req, res) => {
    res.status(200).json({data: 'Hello! This is backend'});
    //res.send("Welcome to the Node.js Mongodb");
})

app.get('/students', (req, res) => {
    let page = req.query.page || 0;
    const studentPerPage = 4;
    
    let users = [];

    db.collection('students')
    .find()
    .skip(studentPerPage * page)
    .limit(studentPerPage)
    .forEach(student => {
        users.push(student)
    })
    .then(() => {
        res.status(200).json({data: users});
    })
    .catch(() => {
        res.status(500).json({error: "Could not fetch students."})
    })
})

app.get('/studentDetail/:id', (req, res) => {
    let studId = req.params.id;
    let transactionList = [];
    let student_data;
    let expenses = 0;
    if (ObjectId.isValid(studId)){
        db.collection('students')
            .findOne({_id: new ObjectId(studId)})
            .then((doc) => {
                student_data = doc;
                //res.status(200).json({student_data: doc})
            })
            .catch(error => {
                res.status(500).json({error: "Could not fetch data"})
            })
        db.collection('expenses')
            .find({student_id: new ObjectId(studId)})
            .forEach(transaction => {
                //transactionList.push(transaction);
                expenses += transaction.amount;
                console.log(`amount: ${transaction.amount}`);
            })
            .then(() => {    
                expenses = (parseInt(expenses*100))/100;
                student_data.expenses = expenses;
                console.log(student_data);
                res.status(200).json({
                    data: student_data
                })
            })
            .catch(error => {
                res.status(500).json({error: 'Could not fetch transactions'});
            })
    } else{
        res.status(500).json({error: `Student with Id ${studId} not found`})
    }
})

app.get('/transaction/:studentId', (req, res) =>{
    let studId = req.params.studentId;
    let transactionList = [];
    if(ObjectId.isValid(studId)){
        db.collection('expenses')
            .find({student_id: new ObjectId(studId)})
            .forEach(transaction => transactionList.push(transaction))
            .then(() => {
                res.status(200).json({data: transactionList})
            })
            .catch(error => {
                res.status(500).json({error: 'Could not fetch transactions'});
            })
    } else{
        res.status(500).json({error: 'Invalid Student Id'});
    }
})

app.patch('/updateBalance', (req, res) => {
    let studId = req.body.id;
    let amount = req.body.amount;
    
    console.log('studId: ' + studId);
    console.log('amount: ' + amount);
    db.collection('students')
        .updateOne({_id: new ObjectId(studId)}, {$set: {balance: amount}})
        .then(() => {
            res.status(200).json({data: amount})            
        })
        .catch(err => {
            res.status(500).json({err: 'Error updating balance'})
        })        
})