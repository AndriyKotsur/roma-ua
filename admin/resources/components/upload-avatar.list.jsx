import React from 'react';
import { Box, Label } from '@admin-bro/design-system';

const List = ({ record, property }) => {
  const srcImg = record.params.avatar;

  return (
    <Box style={{paddingBottom: '20px'}}>
      <Label style={{color: '#898A9A', fontWeight: '300'}}>{property.label}</Label>
      {srcImg ? (
        <img style={{width: '100px', height: '100px', objectFit: 'cover'}} src={srcImg} alt="news" />
      ) : 'no avatar'}
    </Box>
  );
};

export default List;
