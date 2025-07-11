import Image from 'next/image';
import Link from 'next/link';

const LogoTekbot = ({ width = 80, height = 50, showText = true }) => {
  return (
    <div style={logoContainerStyle}>
      <Link href="/" style={linkStyle}>
        {showText && <span style={textStyle}>Tekbot Robotics</span>}
        <div style={{ width, height, position: 'relative' }}>
          <Image
            src="/logo_tekbot.png"
            alt="Tekbot Logo"
            fill
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
      </Link>
    </div>
  );
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
};

const imageStyle = {
  objectFit: 'contain',
};

const textStyle = {
  marginRight: '1.2rem',
  fontSize: '1.2rem',
  fontWeight: 'bold',
};

export default LogoTekbot;
