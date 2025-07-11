// components/Logo.js

import Image from 'next/image'; // Essential for optimized image loading
import Link from 'next/link';   // For navigating to the homepage when clicking the logo

const LogoTRC = ({ width = 300, height = 100, showText = false }) => {
  return (
    <div style={logoContainerStyle}>
      <Link href="/">
        <Image
          src="/trc_logo.svg"
          alt="TRC Logo"
          width={width}
          height={height}
          priority={true}
          style={imageStyle}
        />
      </Link>
    </div>
  );
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',

};

const imageStyle = {
  objectFit: 'contain',
};

const textStyle = {
  marginLeft: '0.8rem',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#61dafb',
};

export default LogoTRC;