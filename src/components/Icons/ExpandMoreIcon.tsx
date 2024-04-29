import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & {
  color?: string;
  size?: string;
};

export const ExpandMoreIcon = ({ color = '', size = '24', ...rest }: Readonly<Props>) => {
  return (
    <svg
      {...rest}
      id="fi_3426514"
      enableBackground="new 0 0 128 128"
      height={size}
      viewBox="0 0 128 128"
      width={size}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m64 92.5 50-50-7.1-7.1-17.1 17.2-25.8 25.8-25.8-25.8-17.1-17.1-7.1 7.1z"></path>
    </svg>
  );
};
