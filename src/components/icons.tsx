import type { SVGProps } from 'react';

export const Logo = (props: SVGProps<SVGSVGElement>) => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
      <path
        d="M16 0C7.163 0 0 7.163 0 16C0 24.837 7.163 32 16 32C24.837 32 32 24.837 32 16C32 7.163 24.837 0 16 0ZM20.485 22.182L13.121 25.028V7.022L20.485 9.868C22.535 10.668 23.586 12.83 23.036 14.864C22.485 16.9 20.485 18.257 18.434 17.457L17.222 17.002L20.485 22.182Z"
        fill="url(#logoGradient)"
      />
    </svg>
);
