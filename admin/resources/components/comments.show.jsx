import React from 'react';
import { Box, Link, Label } from '@admin-bro/design-system';

const Show = ({ record: { populated } }) => {
  const comments = Object.values(populated)

  return (
    <Box>
      <Label style={{color: '#898A9A', fontWeight: '300'}}>
        Коментарі
      </Label>
      {comments && comments.map((item, index) => (
        <Box key={index}>
          {item.params.isApproved ? (
            <Link href={`/control-panel/resources/Comment/records/${item.params._id}/show`} style={{color: '#399E32'}}>
            {index + 1}. {item.params.text}
            </Link>
          ) : (
            <Link href={`/control-panel/resources/Comment/records/${item.params._id}/show`} style={{color: '#DA0314'}}>
              {index + 1}. {item.params.text}
            </Link>
          )}
          <br />
          <br />
        </Box>
      ))}
    </Box>
  );
};

export default Show;
