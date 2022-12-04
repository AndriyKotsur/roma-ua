import React from 'react';
import { Label, Box, DropZone } from '@admin-bro/design-system';

const Edit = ({ property, onChange }) => {
  const handleDropZoneChange = (files) => {
    onChange(property.name, files);
  };

  return (
    <Box style={{ paddingBottom: '40px' }}>
      <Label>{property.label}</Label>
      <DropZone multiple onChange={handleDropZoneChange} />
    </Box>
  );
};

export default Edit;
