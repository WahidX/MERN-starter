import React from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Button } from '@material-ui/core';

function Footer(props) {
  return (
    <footer>
      <div>
        <a href="https://github.com/WahidX">
          <Button>
            {' '}
            <GitHubIcon />
          </Button>
        </a>
      </div>
      <div>
        <a href="https://www.linkedin.com/in/wahidxhossain/">
          <Button>
            {' '}
            <LinkedInIcon />
          </Button>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
