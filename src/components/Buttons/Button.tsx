import classnames from 'classnames';
import { CSSProperties, forwardRef, MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

import { ButtonStyle, buttonStyle } from './types';
import { TextMD } from '../../typography';
// import { Spinner } from '../Spinner';
import { Scale } from '../Transitions/Scale';
import { colors } from '../../constants/colors';

interface Props {
  action?: 'loading';
  btnStyle?: ButtonStyle;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  styleArgs?: Record<string, unknown>;
  disabled?: boolean;
  style?: CSSProperties;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      action,
      btnStyle = buttonStyle.primary,
      onClick,
      children,
      type = 'button',
      styleArgs,
      disabled,
      style,
      ...props
    }: Props,
    ref,
  ) => {
    const [showLoading, setShowLoading] = useState<boolean>(false);

    useEffect(() => {
      setShowLoading(action === 'loading');
    }, [action]);

    return (
      <ButtonContainer
        ref={ref}
        onClick={onClick}
        type={type}
        className={classnames({
          ...styleArgs,
          primary: btnStyle === buttonStyle.primary,
          bordered: btnStyle === buttonStyle.bordered,
          disabled: btnStyle === buttonStyle.disabled,
          action: action === 'loading',
        })}
        disabled={disabled}
        style={style}
        {...props}
      >
        {showLoading && (
          <Scale enter={action === 'loading'}>
            {/* TODO show loading spinner */}
            {/* <Spinner
              size="xs"
              color="#fff"
            /> */}
          </Scale>
        )}
        <TextMD.Bold>{children}</TextMD.Bold>
      </ButtonContainer>
    );
  },
);

Button.displayName = 'Button';

const ButtonContainer = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  gap: 8px;
  isolation: isolate;
  white-space: nowrap;
  outline: none;
  border: none;

  width: 178px;
  height: 40px;

  border-radius: 6px;

  &.bordered {
    background: transparent;
    border: 2px solid ${colors.Peach[500]};
    color: ${colors.Peach[500]};
  }

  &.primary {
    background: ${colors.Mustard[500]};
    color: ${colors.Mustard[500]};
  }

  :focus {
    outline: 0;
  }

  :hover {
    outline: 0;
  }

  &.disabled {
    opacity: 40%;
    pointer-events: none;
    background: ${colors.Mustard[500]};
  }
`;
