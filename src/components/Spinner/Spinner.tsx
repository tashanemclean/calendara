import classNames from 'classnames';

interface SpinnerProps {
  size: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
}

export const Spinner = ({ size, color }: SpinnerProps) => {
  const cx = classNames('spinner-container', {
    'spinner-container-xs': size === 'xs',
    'spinner-container-sm': size === 'sm',
    'spinner-container-md': size === 'md',
    'spinner-container-lg': size === 'lg',
  });

  return (
    <div className={cx}>
      <svg
        version="1.1"
        id="fi_39979"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        fill={color}
        width="26.349px"
        height="26.35px"
        viewBox="0 0 26.349 26.35"
        enableBackground="new 0 0 26.349 26.35"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        className="spinner"
      >
        <circle
          cx="13.792"
          cy="3.082"
          r="3.082"
        ></circle>
        <circle
          cx="13.792"
          cy="24.501"
          r="1.849"
        ></circle>
        <circle
          cx="6.219"
          cy="6.218"
          r="2.774"
        ></circle>
        <circle
          cx="21.365"
          cy="21.363"
          r="1.541"
        ></circle>
        <circle
          cx="3.082"
          cy="13.792"
          r="2.465"
        ></circle>
        <circle
          cx="24.501"
          cy="13.791"
          r="1.232"
        ></circle>
        <path
          d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05
			C6.902,18.996,5.537,18.988,4.694,19.84z"
        ></path>
        <circle
          cx="21.364"
          cy="6.218"
          r="0.924"
        ></circle>
      </svg>
    </div>
  );
};
