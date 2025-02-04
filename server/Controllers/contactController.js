import Contact from "../Models/contactModel.js";

export const ContactUs = async (req,res) => {
    const {name , email , phone , orderNumber,subject, message} = req.body;
    
    const ContactInfo = new Contact({
        name,
        email,
        phone,
        orderNumber,
        subject,
        message
    })
    try{
        await ContactInfo.save();
        res.status(200).json({message : "Contact Info Saved Successfully"})

    }
    catch(error){
        res.status(400).json({message : "Error Occured" , error})
    }
}