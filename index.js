const express=require('express')
const app=express();
const { MongoClient } = require('mongodb');
const ObjectId=require('mongodb').ObjectId;
const cors=require ('cors');
const port=process.env.PORT||5000;


app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://portfolio:sYEiWzlJ2LzZKcSN@cluster0.mrwnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();

        const database = client.db('yooda_hostel');
        const foodsCollection=database.collection('foods');
        console.log('database connected')

        app.get('/food',async(req,res)=>{
            const foodlist=foodsCollection.find({})
            const result=await foodlist.toArray();
            res.json(result);
        })

        app.post('/food',async(req,res)=>{
            const foodData=req.body;
            const result= await foodsCollection.insertOne(foodData)
            res.json(result);
        })

        app.delete('/food/:id',async(req,res)=>{
            const id=req.params.id;
            // console.log(id);
            const query={_id:ObjectId(id)};
            const result=await foodsCollection.deleteOne(query);
            console.log('deletad food item',result)
            res.json(result);
        })
       
    }
    finally{
        // client.close()
    }
}
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('hello Alok')
})

app.listen(port,()=>{
    console.log('Alok portfolio server running successfully')
})