import React from 'react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpValidation } from '@/lib/validation';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useCreateUserAccountMutation, useSignInAccountMutation } from '@/lib/react-query/queriesAndMutations';
import { useAuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

type AttrName = "name" | "username" | "email" | "password";

const SignUpForm = () => {

  const { toast } = useToast();
  const navigate = useNavigate()

  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = useCreateUserAccountMutation()
  const { mutateAsync: signInAccount, isLoading: isSignInAccount } = useSignInAccountMutation()
  const { checkAuthUser, isLoading: isUserLoading } = useAuthContext()


  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof SignUpValidation>) {

    const newUser = await createUserAccount(values)

    if (!newUser) {
      return toast({
        variant: "destructive",
        title: "Sign up failed. Please, try again.",
      })
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if (!session) {
      return toast({
        variant: "destructive",
        title: "Sign in failed. Please, try again.",
      })
    }

    const isLoggedIn = await checkAuthUser()

    if (isLoggedIn) {
      form.reset()
      navigate('/')
    } else {
      return toast({
        variant: "destructive",
        title: "Sign up failed. Please, try again.",
      })
    }
  }

  const renderField = (name: AttrName, label: string, type: string) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input type={type} className='form-input' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  return (
    <div className='grid m-auto w-[320px] p-3 sm:w-[420px]'>
      <Form {...form}>
        <div className='flex flex-col'>
          <div className='flex justify-center items-center gap-x-3'>
            <img
              src="/assets/image/logo.svg"
              alt="logo"
            />
            {/* <h1 className='font-bold text-3xl'>Snapgram</h1> */}
          </div>
          <div className='text-center mt-6'>
            <p className='font-medium text-lg'>Create a new account</p>
          </div>
          <div className='text-center mt-1'>
            <p className=' text-neutral-500'>To use Snapgram enter your details</p>
          </div>
          <form className='flex flex-col gap-3 mt-3' onSubmit={form.handleSubmit(onSubmit)}>
            {renderField('name', 'Name', 'text')}
            {renderField('username', 'Username', 'text')}
            {renderField('email', 'Email', 'email')}
            {renderField('password', 'Password', 'password')}
            <Button
              disabled={isCreatingAccount}
              className='mt-3 form-button_primary'
              type="submit">
              {isCreatingAccount ? <Loader className='animate-spin' /> : 'Sign Up'}
            </Button>
            <div className='text-center'>
              <span className='small-regular text-light-2'>
                Already have an account?
                <Link className='ml-1 text-primary-500 hover:underline small-semibol' to="/signin">Log In</Link>
              </span>
            </div>
          </form>
        </div>
      </Form>
    </div>
  )
}

export default SignUpForm;
