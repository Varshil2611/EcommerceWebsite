import mongoose from 'mongoose';

// Define the Contact Schema
const contactSchema = new mongoose.Schema({
 name : { type:String , required:true},
 email : { type:String , required:true ,unique:false},
 phone : { type:String , required:true},
 orderNumber : { type:String , required:true},
 subject : { type:String , required:true},
 message : { type:String , required:true}
  
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
