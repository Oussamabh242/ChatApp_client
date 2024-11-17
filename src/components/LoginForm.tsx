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
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().min(8).max(50),
  password: z.string().min(8).max(50),
});

const LoginFrom = () => {
  const navigate = useNavigate();
  // useEffect(()=>{
  //   fetchMessages() ;
  // }, []) ;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onsubmit(data: UserLogin) {
    try {
      const res = await login(data);
      if (res.status == 201) {
        navigate('/home');
      }
      //navigate("/home") ;
    } catch (err) {
      console.log(err);
    }
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
                <Input placeholder="Email" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
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

export default LoginFrom;

const login = async (data: UserLogin) => {
  const res = await axios.post('http://localhost:3001/auth/login', data, {
    withCredentials: true,
  });
  console.log(res.data, typeof res.data, res.status);
  localStorage.setItem('accessToken', res.data.access_token);
  return res;
};

type UserLogin = { email: string; password: string };
