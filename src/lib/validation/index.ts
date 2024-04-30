import { z } from 'zod';

export const ACCEPTED_IMAGES_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png'
]

export const SignUpValidation = z.object({

    name: z.string().min(2, {
        message: 'Too short'
    }),

    username: z.string().min(2, {
        message: 'Too short'
    }),

    email: z.string().email({
        message: 'Please enter a valid email address.'
    }),

    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.'
    })
})

export const SignInValidation = z.object({

    email: z.string().email({
        message: 'Please enter a valid email address.'
    }),

    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.'
    })
})

export const PostValidation = z.object({
    caption: z.string().max(245, {
        message: "Text must not be longer than 245 characters.",
    }),
    uploadImages: z.array(z.instanceof(File))
})






