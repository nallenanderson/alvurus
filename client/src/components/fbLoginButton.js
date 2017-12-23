import React from 'react'

const FBLoginButton = ({ onClick }) => {
  return(
    <a onClick={onClick} className="submit__button fb__button">
      Login with facebook
    </a>
  );
}

export default FBLoginButton;
