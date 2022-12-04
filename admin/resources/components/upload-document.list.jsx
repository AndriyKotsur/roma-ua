import React from 'react';
import { Box, Label } from '@admin-bro/design-system';

const Show = ({ property, record }) => {
  const uploadDocument = record.params.document;
  const documentToUpload = record.params[property.name];

  return (
    <Box style={{paddingBottom: '20px'}}>
      <Label style={{color: '#898A9A', fontWeight: '300'}}>{property.label}</Label>
      {uploadDocument && !documentToUpload && (
        <p>{uploadDocument.slice(31)}</p>
      )}
    </Box>
  );
};

export default Show;
