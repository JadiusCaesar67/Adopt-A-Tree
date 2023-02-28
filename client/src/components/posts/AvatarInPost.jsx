import React, { useRef, useState, useEffect } from 'react';
import { Overlay, Popover } from 'react-bootstrap';

function AvatarInPost({ profilePic, userId, username, email, ownId }) {
  const [popoverPlacement, setPopoverPlacement] = useState('bottom');
  const [showPopover, setShowPopover] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleWindowResize = () => {
      const rect = imageRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const placement = rect.top > windowHeight / 2 ? 'top' : 'bottom';
      setPopoverPlacement(placement);
    };
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [showPopover]);

  return (
    <div ref={imageRef}
        onMouseEnter={() => setTimeout(() => {
            setShowPopover(true)
        }, 500)}
        onMouseLeave={() => setShowPopover(false)}
        >
        <img
          src={profilePic}
          alt=""
          className="bd-placeholder-img flex-shrink-0 me-2 rounded-circle profile-pic"
          width="40"
          height="40"
          focusable="false"
        />
        {   
            userId !== ownId &&
            <Overlay
                show={showPopover}
                placement={popoverPlacement}
                target={() => imageRef.current}
                transition={false}
            >
                {
                    showPopover && 
                    <Popover id="popover-content">
                        <Popover.Body>
                            <div className="d-flex align-items-center justify-content-between">
                            <img src={profilePic} alt="" width="64" height="64" className="rounded-circle me-3" />
                            <div>
                                <h6 className="mb-0">{username}</h6>
                                <small className="text-muted">{email}</small>
                                <button type="button" className="btn btn-sm btn-primary">
                                    Message
                                </button>
                            </div>
                            </div>
                        </Popover.Body>
                    </Popover>
                }
            </Overlay>
        }
    </div>
  );
}

export default AvatarInPost;
