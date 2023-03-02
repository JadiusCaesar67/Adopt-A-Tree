import React, { useState } from 'react'
import { Button, Spinner, ModalFooter } from 'react-bootstrap'
import { toast } from 'react-toastify'

const UploadAvatar = ({ handleUpdateAvatar, uploadingAvatar, setUploadingAvatar, setUpdatedAvatar }) => {
    const [image, setImage] = useState({})
    const [isUploading, setIsUploading] = useState(false)

    const fileOnChange = (e) => {
        setImage(e.target.files[0])
    }

    const sendImage = async () => {
        try {
            setIsUploading(true);
            let imageFile = new FormData()
            imageFile.append('avatar', image)
            const response = await fetch(
                `http://localhost:8000/photos/avatar`, 
            {
                method: "POST",
                headers: { 
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                body: imageFile
            })
            const parseRes = await response.json();
            toast.success(parseRes.message)
            setUpdatedAvatar(parseRes.avatar);
            setIsUploading(false);
            setUploadingAvatar(false);
        } catch (error) {
            toast.error("An error occurred, please try again...")
            console.error(error.message)
        }
    }

    return (
        
        <>
            {
                uploadingAvatar && (
                    isUploading ? (
                    <Button variant="success" style={{ cursor:"default"}}>
                        <Spinner
                        as="span"
                        animation="border"
                        role="status"
                        aria-hidden="false"
                        /> Uploading Avatar...
                        <span className="visually-hidden">Loading...</span>
                    </Button>
                    ) : (
                        <><input type="file" onChange={fileOnChange}></input>
                        <ModalFooter>
                            <Button variant="secondary" onClick={handleUpdateAvatar}>Cancel</Button>
                            <Button variant="outline-success" onClick={sendImage}>Upload Avatar</Button>
                        </ModalFooter>
                        </>
                    )
                )
            }
        </>
    )
}

export default UploadAvatar