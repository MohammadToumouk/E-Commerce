import React from 'react'
import "./Login.css";

import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
});

const Login = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data) => {
       await console.log(data);
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
                                        <Input placeholder="E-Mail" {...field}/>
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
                                        <Input type="password" placeholder="Password" {...field}/>
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
