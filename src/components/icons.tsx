import Image from 'next/image';
import type { SVGProps } from 'react';

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <div {...props}>
    <Image
      src="/logo.png"
      alt="DishaDesk Logo"
      width={32}
      height={32}
      className="rounded-md"
    />
  </div>
);
