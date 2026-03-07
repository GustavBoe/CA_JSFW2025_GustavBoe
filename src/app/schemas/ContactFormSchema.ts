import {z} from "zod";

const NAME_REGEX = /^[a-zA-ZæøåÆØÅ .'-]+$/;
export const ContactFormSchema = z.object({
  name: z.
  string()
  .trim()
  .min(3, {message: "Your name must be longer than 3 letters"})
  .max(100, {message: "Your name must be shorter than 100 letters"})
  .regex(NAME_REGEX,{message: "The given name contains invalid signs"}),
  email: z.
  string()
  .trim()
  .min(1, {message: "Email is needed"}).email({message: "Invalid format"}),
  subject:z.
  string()
  .trim()
  .min(3, {message: "Subject must be longer than 3 letters"})
  .max(50,{message:"Subject cannot be longer than 50 letters"}),
  message: z.
  string()
  .trim()
  .min(10, {message:"Message needs to be longer than 10 letters/symbols"})
  
})

export type ContactFormData = z.infer<typeof ContactFormSchema>;