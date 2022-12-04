import React from 'react';
import { Label, Box, DropZone } from '@admin-bro/design-system';

const Edit = ({ property, onChange, record }) => {
  const handleDropZoneChange = (files) => {
    onChange(property.name, files[0]);
  };

  const uploadedImage = record.params.image;
  const imageToUpload = record.params[property.name];

  return (
    <Box style={{ paddingBottom: '20px' }}>
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange} />
      {uploadedImage && !imageToUpload && (
        <img style={{ width: '100px', height: '100px' }} src={uploadedImage} alt='news' />
      )}
    </Box>
  );
};

export default Edit;