"use client"

import {useEffect  } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "@/components/LoginForm" ; 
import SignupForm from "@/components/SignupForm";

export function Auth(){
  
    // 
    
    
    // useEffect(()=>{

    //   fetchTodos()
    //   .then(res =>{
    //     console.log(res)
    //   })
    // }, []) ; 
     
    
    return (
      <div className="w-full Auth flex flex-col items-center justify-center">
        <Tabs defaultValue="SignIn" className="w-1/3" >
          <TabsList className="w-full">
            <TabsTrigger value="SignIn" className="flex-grow data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">signin</TabsTrigger>
            <TabsTrigger value="Signup" className="flex-grow data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">signup</TabsTrigger>
          </TabsList>
          <TabsContent value="SignIn" >

          <LoginForm/>
          
          </TabsContent>
          <TabsContent value="Signup">
            <SignupForm/>
          </TabsContent>
        </Tabs>
      </div>
        
        
      )

}


