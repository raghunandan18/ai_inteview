"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const authformschema = (type: FormType) => {
  return z.object({
    username: type === "sign-up" ? z.string().min(3, { message: "Name must be at least 3 characters." }) : z.string().optional(),
    email: z.string().email ({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  })
}

const AuthForm = ({ type }: { type: FormType}) => {
  const router = useRouter();
  const formSchema = authformschema(type)

    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      if(type === "sign-in"){
        toast.success("Signed in successfully!")
        router.push("/dashboard")
      }
      else{
        toast.success("Account created successfully!")
        router.push("/dashboard")
      }

    }catch(error){
      console.log(error);
      toast.error("there was an error. : ${error}")
    }
  }

  const issignin = type === "sign-in";
    return (
        <div className="card-border lg:min-w-[566px]">
            <div className = "flex flex-col gap-6 card px-10 py-14">
              <div className="flex flex-row gap-2 justify-center">
                <img src = "/logo.svg" alt = "logo" height={32} width={38} />
                <h2 className = "text-primary-100">PrepAi</h2>
              </div>  
              <h3>Practice job interviews with AI</h3>
            
             
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8 mt-4 form ">
                {!issignin && (
                   <FormField
                    control={form.control}
                    name="username"
                    label="Name"
                    placeholder="Enter your name" 
                  />

                )}
                <FormField
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    type="email" 
                  />
              <FormField
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Enter your password" 
                  />

                <Button className ="btn" type="submit" >{issignin? 'Sign in': 'Create an Account'}</Button>
              </form>
            </Form>
            <p className="text-sm text-center text-muted-foreground">
                {issignin ? "New to PrepAi? " : "Already have an account? "}
                <a href={issignin ? "/sign-up" : "/sign-in"} className="underline hover:text-primary-100 transition-colors cursor-pointer">
                  {issignin ? "Create an account" : "Sign in"}
                </a>
              </p>
            </div>
        </div>

    )
}
export default AuthForm
