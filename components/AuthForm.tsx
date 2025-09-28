"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Image from "next/image"
import  FormField from "@/components/FormField"
import { signIn, signUp } from "@/lib/actions/auth.action"
import { auth } from "@/firebase/client"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth"

const authFormSchema = (type: FormType) => {
  return z.object({
    username:
      type === "sign-up"
        ? z
            .string()
            .min(3, { message: "Name must be at least 3 characters." })
        : z.string().optional(),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter()
  const formSchema = authFormSchema(type)

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
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { username, email, password}= values;

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        const result  = await signUp({
          uid:userCredentials.user.uid,
          name:username!,
          email,
          password,
        })
        
        if(!result?.success){
          toast.error(result?.message);
          return;
        }

        toast.success("Account created successfully! please sign in.")
        router.push("/sign-in")
      } else {
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword (auth, email, password);

        const idToken = await userCredentials.user.getIdToken();
        
        if(!idToken){
          toast.error('Sign in failed')
          return;
        }
        
        await signIn({
          email,idToken
        })

        toast.success("Signed in successfully!")
        router.push("/")
      }
    } catch (error) {
      console.log(error)
      toast.error(`There was an error: ${error}`)
    }
  }

  const isSignIn = type === "sign-in"

    return (
        <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card px-10 py-14">
        {/* Logo and Heading */}
              <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepAi</h2>
              </div>  
              <h3>Practice job interviews with AI</h3>
            
        {/* Form */}
            <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8 mt-4 form"
          >
            {/* Username only for Sign Up */}
            {!isSignIn && (
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
              type="password"
                  />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign in" : "Create an Account"}
            </Button>
              </form>
            </Form>

        {/* Footer link */}
            <p className="text-sm text-center text-muted-foreground">
          {isSignIn ? "New to PrepAi? " : "Already have an account? "}
          <a
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="underline hover:text-primary-100 transition-colors cursor-pointer"
          >
            {isSignIn ? "Create an account" : "Sign in"}
                </a>
              </p>
            </div>
        </div>
    )
}

export default AuthForm
