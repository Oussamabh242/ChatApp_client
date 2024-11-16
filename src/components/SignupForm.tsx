import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import axios from 'axios';

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
  fullName: z.string().min(8).max(50),
  passwordConfirm: z.string().min(8).max(50),
});

const SignupForm = () => {
  // const [message , setmessage] = useState<Message|undefined>(undefined) ;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      passwordConfirm: '',
    },
  });

  async function onsubmit(data: any) {
    if (data.password != data.passwordConfirm) {
      console.log('passwords didnot match');
      return;
    }
    const req = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    };
    const res = await signup(data);
    console.log(res);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className=" space-y-8 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex justify-center">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;

const signup = async (data: UserSignup) => {
  const res = await axios.post('http://localhost:3001/user', data);
  return res;
};

type UserSignup = {
  fullName: string;
  email: string;
  password: string;
};
