import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "../ui/card";

import React from 'react'

export const CardDashboard = ({title,avatarUrl,content,details}) => {
    
  return (
    
                <Card className= "bg-midnight border-neutral-700 shadow-2xl">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-white">
                    <CardTitle className="text-base font-medium">
                      {title}
                    </CardTitle>
                    <svg
                      xmlns={avatarUrl}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white text-2xl">{content}</div>
                    <p className="text-xs text-muted-foreground text-teal-300">
                      {details}
                    </p>
                  </CardContent>
                </Card>
                
  )
}
