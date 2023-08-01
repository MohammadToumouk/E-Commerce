import { useState } from "react";
import TitleHeadings from "@/components/TitleHeading";
import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TextareaWithLabel } from "@/components/Textarea";
import UploadWidget from "@/components/UploadWidget";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.string().min(2).max(10),
});

export const ProfilePageForm = () => {
  const [profileImageUrl, setProfileImageUrl] = useState();
  const [isHovered, setIsHovered] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });

  const userId = "123"; // Replace this with the actual user ID

  const onSubmit = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:3069/user/${userId}`,
        {
          name: values.name,
          email: values.email,
          role: values.role,
          profilePicture: profileImageUrl, // Send the profile picture URL to the backend
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from server:", response.data);
      // Add any further actions or notifications for successful update here.
    } catch (error) {
      console.error("Error while updating:", error);
      // Add error handling or notifications for failed updates here.
    }

    console.log("Updated user data:", values);
  };

  const handleProfileImageUpload = async (newImage) => {
    await setProfileImageUrl(newImage);
    form.setValue("profilePicture", newImage);
  };

  return (
    <div className="update-user-container">
      <div className="update-user-content">
        <div className="update-user-header">
          <TitleHeadings
            title="Update User Profile"
            subtitle="Update your user profile information"
          />
        </div>
        <div className="my-10 w-full flex justify-center border rounded-md border-zinc-500 p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="inputs-container flex flex-row ">
                <div className="w-8/12">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name*</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Name"
                            className="text-white bg-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email"
                            className="text-white bg-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role*</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Role"
                            className="text-white bg-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormItem>
                    <div className="w-48 h-80 bg-gray-600 border-lg flex flex-col items-center justify-center m-auto rounded-[35px] relative overflow-hidden ml-10">
                      <div className="relative">
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                          <div className="flex flex-col">
                            <img
                              className="sidebar-profileImage"
                              src={profileImageUrl || "userprofile"} // Use profileImageUrl here to display the selected image
                              alt="Profile Image"
                            />
                          </div>
                          <div className="my-10 w-30">
                            <FormControl>
                              {/* The UploadWidget for profile picture */}
                              <UploadWidget
                                onImageUpload={handleProfileImageUpload}
                              />
                            </FormControl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                </div>
              </div>
              <div className="space-x-2 flex justify-center items-center w-full">
                <Button className="update-user-button" type="submit">
                  Update Profile
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
