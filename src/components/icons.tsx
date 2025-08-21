import Image from 'next/image';

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
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
