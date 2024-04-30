import { Image } from 'lucide-react'
import { Input } from '../ui/input'
import React from 'react'

const FileUpload = ({ handleOnChange }: {
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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