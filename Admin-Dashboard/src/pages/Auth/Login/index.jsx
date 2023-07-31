import React from 'react'
import "./Login.css";
import axios from 'axios'

import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NavLink, Navigate } from 'react-router-dom';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
});

const Login = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
       try {
        await axios.post('http://localhost:3069/user/login',{
            email: data.email,
            password: data.password
        },{
            withCredentials:true
        });

        console.log("Login successful")

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

        window.location.href = "/dashboard"
    };


  return (
    <div>
        <h1 className="login-title" >Sign In</h1>
        <p className="login-subtitle">Enter your details below</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="pt-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field, formState }) => (
                                <FormItem>
                                    <FormLabel>E-Mail</FormLabel>
                                    <FormControl>
                                        <Input 
                                          type="email"
                                          className="ml--4"
                                          placeholder="E-Mail"
                                          {...field}
                                        />
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
                                        <Input type="password" className="ml--4" placeholder="Password" {...field}/>
                                    </FormControl>
                                    <FormMessage>
                                        {formState.errors?.password?.message}
                                    </FormMessage>
                                </FormItem> 
                            )}
                        />
                    </div>

                    <div className="pt-6 grid">
                        <Button type="submit">Sign In</Button>
                    </div>

                    <p className="login-signUpInfo">{"Don't have an account? "} 
                        <NavLink
                          to="/register"
                          className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active login-signUpInfo" : ""}
                        >
                           Sign Up
                        </NavLink>
                    </p>
                </form>
            </Form>
    </div>
  )
}

export default Login
