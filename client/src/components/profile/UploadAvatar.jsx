import React, { useState } from 'react'

const UploadAvatar = () => {
    const [image, setImage] = useState({})

    const fileOnChange = (e) => {
        setImage(e.target.files[0])
        console.log(image)
    }

    const sendImage = async () => {
        try {
            let imageFile = new FormData()
            imageFile.append('avatar', image)
            console.log(imageFile)
            const newImage = await fetch(
                `http://localhost:8000/photos/avatar`, 
            {
                method: "POST",
                headers: { 
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                body: imageFile
            })
            
            const parseRes = await newImage.json()
            console.log(parseRes)
            window.location.reload(false)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <input type="file" onChange={fileOnChange}></input>
            <button className="button-upload btn btn-light" onClick={sendImage}>Upload</button>
        </div>
    )
}

export default UploadAvatar