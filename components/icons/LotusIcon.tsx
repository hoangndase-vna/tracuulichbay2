
import React from 'react';

const LotusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12 6c-1.49 0-2.7 1.21-2.7 2.7 0 1.1.64 2.05 1.55 2.47l-1.5 4.51c-.1.3.14.62.45.62h4.4c.31 0 .55-.32.45-.62l-1.5-4.51c.91-.42 1.55-1.37 1.55-2.47C14.7 7.21 13.49 6 12 6zm0 4.2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  );
};

export default LotusIcon;
