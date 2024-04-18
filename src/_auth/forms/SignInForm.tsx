import React from 'react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';
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
import { SignInValidation } from '@/lib/validation';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useCreateUserAccountMutation, useSignInAccountMutation } from '@/lib/react-query/queriesAndMutations';
import { useAuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

type AttrName = "email" | "password";

const SignInForm = () => {

  const { toast } = useToast();
  const navigate = useNavigate()

  // const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = useCreateUserAccountMutation()
  const { mutateAsync: signInAccount, isLoading: isSignInAccount } = useSignInAccountMutation()
  const { checkAuthUser, isLoading: isUserLoading } = useAuthContext()


  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof SignInValidation>) {

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
              <Input
                type={type}
                className='form-input'
                {...field}
              />
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
            <p className='font-medium text-lg'>Log in to your account</p>
          </div>
          <div className='text-center mt-1'>
            <p className=' text-neutral-500'>Welcom back! Please enter your details</p>
          </div>
          <form className='flex flex-col gap-3 mt-3' onSubmit={form.handleSubmit(onSubmit)}>
            {renderField('email', 'Email', 'email')}
            {renderField('password', 'Password', 'password')}
            <Button
              disabled={isUserLoading}
              className='mt-3 form-button_primary'
              type="submit">
              {isUserLoading ? <Loader className='animate-spin' /> : 'Log in'}
            </Button>
            <div className='text-center'>
              <span className='small-regular text-light-2'>
                Don't have an account?
                <Link className='ml-1 text-primary-500 hover:underline small-semibol' to="/signup">Sign up</Link>
              </span>
            </div>
          </form>
        </div>
      </Form>
    </div>
  )
}

export default SignInForm;
