import React, { useState, useEffect } from "react";
import { Button, Card, Stack, Modal, Spinner, Tooltip, OverlayTrigger } from 'react-bootstrap';
// import { ProfileInfo } from "./SubComponents.jsx";
import EditProfileForm from "./EditProfileForm.jsx";
import ChangePasswordForm from "./ChangePasswordForm.jsx";
import "./profile-section.css"
import Avatar from "./AvatarProfile";
import UploadAvatar from "./UploadAvatar";

const ProfileSection = ({ 
  profile, loadingAvatar, setShowEditForm, showEditForm, 
  handleUpdateProfile, isUpdating, onChangePassword, handleDeleteUser, isDeleting }) => {

  const [sureDelete, setSureDelete] = useState(false);
  // const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [updatedAvatar, setUpdatedAvatar] = useState(profile.avatar);

  useEffect(() => {
    setUpdatedAvatar(profile.avatar)
  }, [loadingAvatar])

  const handleUpdateAvatar = () => {
    setUploadingAvatar(uploadingAvatar => !uploadingAvatar)
  }

  const handleSureDeleteUser = () => {
    setSureDelete(true);
  };

  const handleCancelDeleteUser = () => {
    setSureDelete(false);
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
  };

  const handleChangePassword = () => {
    setShowChangePasswordForm(true);
  };

  const handleCancelChangePassword = () => {
    setShowChangePasswordForm(false);
  };
    
  return (
    <div className="profile-page">
      {/* <CoverPhoto imageUrl={`http://localhost:8000/img/${user.avatar}`} /> */}
      {showEditForm && (
        <>
        <EditProfileForm 
          user={profile} 
          onSave={handleUpdateProfile} 
          onCancel={handleCancelEdit} 
          isUpdating = {isUpdating}
          showChangePasswordForm={showChangePasswordForm}
        />
        </>
      )}
      {showChangePasswordForm && (
        <ChangePasswordForm onSave={onChangePassword} onCancel={handleCancelChangePassword} />
      )}
      
      {!showEditForm && !showChangePasswordForm && (
        <Card>
          <Card.Header>
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="top"
              overlay={
                <Tooltip>
                  Click to upload & change avatar.
                </Tooltip>
              }
              >
                <div onClick={handleUpdateAvatar}>
                  <Avatar avatar={updatedAvatar} loadingAvatar={loadingAvatar}/>
                </div>
            </OverlayTrigger>
            <h1 className="fw-bold mb-0 text-center">{profile.first_name} {profile.last_name}</h1>
          </Card.Header>
          <Card.Body>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <p>Location: {profile.address}</p>
            {/* <p>Bio: {profile.bio}</p> */}
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" className="" size="sm" onClick={handleEdit}>
              Edit Profile
            </Button>
          </Card.Footer>
        </Card>
      )}

      <Modal show={uploadingAvatar}>
        <UploadAvatar 
              handleUpdateAvatar={handleUpdateAvatar}
              uploadingAvatar={uploadingAvatar} 
              setUploadingAvatar={setUploadingAvatar} 
              setUpdatedAvatar={setUpdatedAvatar} 
              />
      </Modal>

      <div className="header">
      <Stack gap={2} className="mt-3">
            {showEditForm && !showChangePasswordForm && (
            <>
            <Button variant="primary" onClick={handleChangePassword} disabled>
              Change Password
            </Button>
            </>
          )}
          {showEditForm && (
            <Button variant="danger" onClick={handleSureDeleteUser}>
              Delete Account
            </Button>
          )}
        </Stack>
      </div>
    <Modal show={sureDelete} onHide={!sureDelete} centered>
            {
                isDeleting?
                ( 
                    <Button variant="danger" style={{ cursor:"default"}}>
                        <Spinner
                        as="span"
                        animation="border"
                        role="status"
                        aria-hidden="false"
                        /> Deleting Account...
                        <span className="visually-hidden">Loading...</span>
                    </Button> ) : (
            <Modal.Footer>
                <h3>Are you sure, do you want to delete your account?</h3>
                <Button variant="danger" onClick={handleDeleteUser} className="ms-2">
                    Delete Account
                </Button>
                <Button variant="secondary" onClick={handleCancelDeleteUser}>
                    No
                </Button>
            </Modal.Footer>
                )
            }
        </Modal>
    </div>
  );
};

export default ProfileSection;
