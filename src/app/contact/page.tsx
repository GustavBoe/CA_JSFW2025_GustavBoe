"use client"
import {useForm} from "react-hook-form"
import type { FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormData, ContactFormSchema } from "../../../schemas/ContactFormSchema";

 function ContactForm(){
 const{register,handleSubmit,formState:{errors, isSubmitting}, reset} =useForm<ContactFormData>({
  resolver:zodResolver(ContactFormSchema),
  defaultValues:{
    name:"",
    email:"",
    subject:"",
    message:""
  },
  mode: "onBlur",
},
);
const onSubmit = (data:ContactFormData)=>{
  alert(`Thank you ${data.name} for your feedback regarding ${data.subject}`);
  reset();
}
//Got help from chatGPT for the typing of formErrors
const onError = (formErrors:FieldErrors<ContactFormData>) => {
  const firstErrorKey = Object.keys(formErrors)[0];
  if(firstErrorKey){
    const fieldElement = document.getElementsByName(firstErrorKey)[0]
    if(fieldElement){
      fieldElement.focus()
    }
  }
};
return(
  <form
  onSubmit={handleSubmit(onSubmit,onError)}>
    <h2>Contact us!</h2>
    <div>
      <label htmlFor="name">Name:</label>
      <input id="name" {...register("name")} aria-invalid={errors.name ? "true" : "false"} />
      {errors.name && (<p>{errors.name.message}</p>)}
    </div>
    <div>
      <label htmlFor="email">Email:</label>
      <input id="email" {...register("email")} aria-invalid={errors.email ? "true" : "false"} />
      {errors.email && (<p>{errors.email.message}</p>)}
    </div>
    <div>
      <label htmlFor="subject">Subject:</label>
      <input id="subject" {...register("subject")} aria-invalid={errors.subject ? "true" : "false"} />
      {errors.subject && (<p>{errors.subject.message}</p>)}
    </div>
    <div>
      <label htmlFor="message">message:</label>
      <input id="message" {...register("message")} aria-invalid={errors.message ? "true" : "false"} />
      {errors.message && (<p>{errors.message.message}</p>)}
    </div>
    <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending feedback.." : "Send feedback"}</button>
  </form>
);
}
export default ContactForm;