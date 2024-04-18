import React from 'react'

const PostMedia = ({ mediaUrl }: {
    mediaUrl: string[]
}) => {
    return (
        <div>
            {
                mediaUrl.map((url, index) => (
                    <img key={index} src={url} alt='image' />
                ))
            }
        </div>
    )
}

export default PostMedia
