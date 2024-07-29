const mongoose=require ('mongoose');
const enrollmentSchema=mongoose.Schema({
    courseName:String,
    courseDescription:String,
    courseCategory:String,
    courseImage:String
})

const EnrollmentData=mongoose.model('detail',enrollmentSchema);
module.exports=EnrollmentData;