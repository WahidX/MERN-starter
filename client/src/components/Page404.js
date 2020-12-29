import { authorize } from 'passport';
import React from 'react';

function Page404(props) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        margin: '200px 0px',
        justifyContent: 'center',
      }}
    >
      <h1>404 Page Not Found&nbsp;!</h1>
    </div>
  );
}

export default Page404;
