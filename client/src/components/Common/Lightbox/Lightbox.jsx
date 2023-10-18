import React, { useState } from 'react';
import { Download } from '@mui/icons-material';
import { Grid } from '@mui/material';

import Lightbox from 'react-image-lightbox';
import { useSelector } from 'react-redux';

function UserDocuments() {
  const { userDetails } = useSelector((state) => state.admin.users);
  const attachments = [userDetails.user?.idPhotoFront, userDetails?.user?.idPhotoBack, userDetails?.user?.idPhotoSelfie];
  const images = attachments.map((item) => item && `/${item}`);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };
  return !userDetails?.user.idPhotoFront || !userDetails?.user.idPhotoSelfie ? (
    <div className="text-center text-muted fs-4">No Documents Uploaded</div>
  ) : (
    <>
      <Grid container>
        {attachments.map((attachment, aIndex) => {
          return (
            attachment && (
              <Grid item key={`m.attachment.${aIndex}`}>
                <div className="lightbox h-100 flex-center attachment m-auto cursor-pointer" onClick={() => openLightbox(aIndex)}>
                  <img
                    src={`/${attachment}`}
                    className="h-100 w-100 m-auto rounded-md-top"
                    alt={attachment}
                    style={{ objectFit: 'contain' }}
                  />
                  {/* )} */}
                </div>
                <div className="position-absolute text-extra-small text-white opacity-75 w-90 b-2 s-2 time flex-center">
                  {/* <span>{time}</span> */}
                  <a href={`${ENV.AWS_IMG_URL}/${attachment}`} target="_blank" rel="noreferrer" className="d-block body-link text-primary">
                    <Download/>
                  </a>
                </div>
              </Grid>
            )
          );
        })}
      </Grid>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % attachments.length]}
          prevSrc={images[(photoIndex + attachments.length - 1) % attachments.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + attachments.length - 1) % attachments.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % attachments.length)}
          loader={<>loading...</>}
          wrapperClassName="rounded-lg"
        />
      )}
    </>
  );
}

export default UserDocuments;
