const express=require('express');
const app=new express();
const cors=require('cors');
require('./connection');
app.use(express.json());
app.use(cors());
const enrollmentModel=require('./model/EnrollmentData');
const User=require('./model/User');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

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


// Unified Login
app.post('/login', async (req, res) => {
    const { email, password, role } = req.body;
  
    if (!['student', 'instructor'].includes(role)) {
      return res.status(400).send('Invalid role');
    }
  
    try {
      const user = await User.findOne({ email, role });
  
      if (!user) {
        return res.status(404).send('${role.charAt(0).toUpperCase() + role.slice(1)} not found');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).send('Invalid credentials');
      }
  
      const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).send('Error logging in user');
    }
  });
  
  // Unified Signup
  app.post('/signup', async (req, res) => {
    const { name, email, password, phoneNumber, address, role } = req.body;
  
    if (!['student', 'instructor'].includes(role)) {
      return res.status(400).send('Invalid role');
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
        role,
      });
  
      await newUser.save();
      res.status(201).send('${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(400).send('Error registering user');
    }
  });


  // Enroll Course for Student
app.post('/enrollcourse', async (req, res) => {
  const { courseId, userId } = req.body;

  try {
    console.log('Enrolling course ${courseId} for user ${userId}'); // Debugging log
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).send('Course already enrolled');
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).send('Course enrolled successfully');
  } catch (error) {
    console.error('Error enrolling course:', error); // Improved error logging
    res.status(500).send('Error enrolling course');
  }
});
// Get Enrolled Courses for a specific student
app.get('/enrolledcourses/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('enrolledCourses');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user.enrolledCourses);
  } catch (error) {
    console.log(error);
    res.status(400).send('Error fetching enrolled courses');
  }
});

app.listen(2999,()=>{
    console.log('server is running on port 2999');
})