export default function validation(values){
    const errors ={};

    // Regular Expression to validate email
    const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   // Regular Expression to validate phone number
   const phoneNumberRegex = /^(\+91[\s]?)?[0]?(91)?[6789]\d{9}$/;
   errors.is=false;
   if(values.Name === ""){
    errors.is=true;
    errors.Name="Name is Required!";
   }

   if(values.Phone=== ""){
    errors.is=true;
    errors.Phone="Phone Number is Required!";
   }
   else if(!phoneNumberRegex.test(values.Phone)){
    errors.is=true;
    errors.Phone ="Phone Number is not Valid!";
   }
   
   if(values.Email === ""){
    errors.is=true;
    errors.Email="Email is Required!"
   }
   else if(!email_pattern.test(values.Email)){
    errors.is=true;
    errors.Email="Email is not Valid!";
   }

   if(values.Message === ""){
    errors.is=true;
    errors.Message= "Message is Required!";
   }
   return errors;
}