const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://rezil:passwrd123@cluster0.lfwfhmf.mongodb.net/enrollmentdb?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('DB is connected');
}).catch((error)=>{
    console.log('Connection error!');
});