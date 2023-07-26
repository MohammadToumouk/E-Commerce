import React from 'react'
import "./Register.css";
import axios from 'axios'
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { NavLink } from 'react-router-dom';

const formSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
    // phoneNumber: z.string().min(10).max(10),
    // address: z.string().min(2).max(100),
    // city: z.string().min(2).max(100),
    // state: z.string().min(2).max(100),
    // zipCode: z.string().min(5).max(5),
    // country: z.string().min(2).max(100),
    // terms: z.boolean().refine((val) => val === true, {
    //     message: "You must agree to the terms and conditions",
    // }),
});

const Register = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data) => {
        
        if (data.password !== data.confirmPassword) {
            form.setError("confirmPassword", {
              type: "manual",
              message: "Passwords do not match",
            });
            return; // Stop the execution of onSubmit if passwords do not match
        }
            
        try {
            await axios.post('http://localhost:3069/user/register',{
                name: data.name,
                email: data.email,
                password: data.password
            },{
                withCredentials: true
        })
            
            
            
        } catch (error) {
            if (error.response) {
                // Handle specific HTTP response status codes
                if (error.response.status === 401) {
                    console.log("Unauthorized: Invalid credentials");
                } else if (error.response.status === 403) {
                    console.log("Forbidden: Access denied");
                }
                } else if (error.message) {
                // Handle specific error messages
                if (error.message === "Network Error") {
                    console.log("Network error: Unable to reach the server");
                } else {
                    console.log("Unknown error occurred");
                }
            }
        }

        await console.log(data);
    };
       
    


  return (
    <div>
        <h1 className="register-title" >Create an account</h1>
        <p className="register-subtitle">Enter your details to create your account</p>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="pt-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field, formState }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input className="ml--4" placeholder="Name" {...field}/>
                                </FormControl>
                                <FormMessage>
                                    {formState.errors?.name?.message}
                                </FormMessage>
                            </FormItem> 
                        )}
                    />
                </div>
                <div className="pt-3">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field, formState }) => (
                            <FormItem>
                                <FormLabel>E-Mail</FormLabel>
                                <FormControl>
                                    <Input className="ml--4" type="email" placeholder="E-Mail" {...field}/>
                                </FormControl>
                                <FormMessage>
                                    {formState.errors?.email?.message}
                                </FormMessage>
                            </FormItem> 
                        )}
                    />
                </div>
                <div className="pt-3">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field, formState }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input className="ml--4" type="password" placeholder="Password" {...field}/>
                                </FormControl>
                                <FormMessage>
                                    {formState.errors?.password?.message}
                                </FormMessage>
                            </FormItem> 
                        )}
                    />
                </div>

                <div className="pt-3">
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field, formState }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input className="ml--4" type="password" placeholder="Confirm Password" {...field} />
                                </FormControl>
                                <FormMessage>
                                    {formState.errors?.confirmPassword?.message}
                                    {formState.errors?.confirmPassword?.message === "Passwords do not match" && (
                                        <p className="register-error">Passwords do not match</p>
                                    )}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                </div>


                <div className="pt-6 grid">
                    <Button type="submit">Sign Up</Button>
                </div>

                <p className="register-signInInfo">
                    {"Already have an account? "} 
                    <NavLink
                      to="/login"
                      className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active register-signInInfoLink" : ""}
                    >
                      Sign In
                    </NavLink>
                </p>

                <p className="register-terms">
                    {"By creating an account you agree to the "} 
                    <a href="/terms" className="terms-link">{"Terms of Service"}</a> 
                    {" and "}    
                    <a href="/privacy" className="terms-link">{"Privacy Policy"}</a>
                </p>
            </form>
        </Form>
    </div>
  )
}

export default Register
