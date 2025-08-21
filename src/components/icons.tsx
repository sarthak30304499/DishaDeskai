export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16 2L2 9V23L16 30L30 23V9L16 2Z" 
        className="stroke-primary" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"/>
      <path d="M2 9L16 16L30 9" 
        className="stroke-primary" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"/>
      <path d="M16 30V16" 
        className="stroke-primary" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"/>
    </svg>
  );
  