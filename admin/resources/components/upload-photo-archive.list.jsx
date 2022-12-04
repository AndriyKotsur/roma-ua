import React from 'react';
import { Box } from '@admin-bro/design-system';

const List = ({ record }) => {
  const imagesLength = Object.keys(record.params).length - 6;
  let images = []
  if (imagesLength) {
    for (let i = 0; i < imagesLength; i++) {
      images.push(record.params[`images.${i}`]);
    }
  }

  return (
    <Box style={{paddingBottom: '20px'}}>
      {images && images.map((image, index) => (
        <img key={index} style={{width: '150px', height: '150px'}} src={image} alt="news" />
      ))}
    </Box>
  );
};

export default List;
