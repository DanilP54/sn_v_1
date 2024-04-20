import React, { ChangeEvent } from 'react'
import { Image } from 'lucide-react'
import { Input } from '../ui/input'
import { ControllerRenderProps, useForm, useWatch } from "react-hook-form";
import { PostValidation } from '@/lib/validation';



const FileUpload = ({ handleOnChange }: {
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void
}) => {


    return (
        <>
            <label htmlFor="upload-images" className=' cursor-pointer'>
                <Image size={21} />
                <Input onChange={handleOnChange} multiple className="hidden" type='file' accept='image/*, .png, .jpeg, .jpg' id='upload-images' />
            </label>
        </>
    )
}


export default FileUpload;