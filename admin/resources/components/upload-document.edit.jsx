import React from 'react';
import { Label, Box, DropZone } from '@admin-bro/design-system';

const Edit = ({ property, onChange, record }) => {
  const handleDropZoneChange = (files) => {
    onChange(property.name, files[0]);
  };

  const uploadDocument = record.params.document;
  const documentToUpload = record.params[property.name];

  return (
    <Box style={{ paddingBottom: '40px' }}>
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange} />
      {uploadDocument && !documentToUpload && (
        <p>{uploadDocument.slice(31)}</p>
      )}
    </Box>
  );
};

export default Edit;
