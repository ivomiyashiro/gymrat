import { SVGProps } from 'react';

export const GymratLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg width={ 31 } height={ 24 } viewBox="0 0 31 24" { ...props }>
    <g fill={ props.color } fillRule="nonzero">
      <path d="M0 0h30.4s-14 15.5-21 23.2c.3-.6.5-1.1.9-1.6-.3 0-.7-1.3-1-1.9l-1.2.6c-.2.2-.6.1-.8-.1 0-.1-.1-.1-.1-.2-.2-.4-.3-.8-.5-1.3-.5.3-1 .5-1.5.7L.3 17.3h3.5l1.6 1.3c.4-.4.7-1 1-1.3h.9c.3.3.6.9 1 1.3.4-.4.8-.9 1.2-1.2h.6c.3.3.7.8 1 1.1h.1s.6-.8.9-1.1h.7s9-13.5 9-13.6C14.6 2.5 0 0 0 0" />
      <path d="m8.9 8-5-2.8 8.9 2.1z" />
    </g>
  </svg>
);
