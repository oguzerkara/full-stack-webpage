import React, { use } from 'react';
import { useRouter } from 'next/navigation';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <section>
      <div 
        className="text-center p-4">© {year} 
        &nbsp; Integreat
        </div>

    </section>
  );
};

export default Footer;