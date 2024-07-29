const express=require('express');
const app=new express();
const cors=require('cors');
require('./connection');
app.use(express.json());
app.use(cors());
const enrollmentModel=require('./model/EnrollmentData');



//post:
app.post('/addcourse',async(req,res)=>{
    try{
        var item=req.body; 
        const data_add=new enrollmentModel(item);
        const data= await data_add.save();
        res.send('post successful');
    }
    catch (error){
      console.log(error);
    }
})

//get:
app.get('/details', async(req,res)=>{

    try{
        const data = await enrollmentModel.find();
 res.send(data);
    }

    catch(error){
        console.log(error);
    }
 
})

//put:
app.put('/editcourse/:id',async(req,res)=>{
    try {
        const data= await enrollmentModel.findByIdAndUpdate(req.params.id,req.body)
        res.send('update successful')
    } catch (error) {
        console.log(error);
    }
})


//delete:
app.delete('/deletecourse/:id',async(req,res)=>{
    try {
        const data= await enrollmentModel.findByIdAndDelete(req.params.id)
        res.send('delete successful')
    } catch (error) {
        console.log(error);
    }
})

app.listen(2999,()=>{
    console.log('server is running on port 2999');
})