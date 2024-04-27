import React, { forwardRef, InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactElement;
  prefixWidth?: string | number;
  suffixIcon?: React.ReactElement;
  register?: UseFormRegisterReturn;
  height?: number | string;
  width?: number | string;
  containerWidth?: string;
  type?: string;
}

export const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    { prefixIcon, prefixWidth, suffixIcon, register, containerWidth, type, height, width, ...rest }: Readonly<Props>,
    ref,
  ) => {
    return (
      <Container width={containerWidth}>
        {prefixIcon && <div className="prefix">{prefixIcon}</div>}
        <InputText
          ref={ref}
          register={register}
          type={type}
          height={height}
          width={width}
          {...(prefixIcon && prefixWidth && { paddingLeft: prefixWidth })}
          {...(suffixIcon && { paddingRight: 40 })}
          {...rest}
        />
        {suffixIcon && <div className="suffix">{suffixIcon}</div>}
      </Container>
    );
  },
);

interface InputTextProps {
  type?: string;
  height?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  register?: UseFormRegisterReturn;
  width?: string | number;
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ height, paddingLeft, paddingRight, register, type, width, ...rest }: InputTextProps, ref) => (
    <input
      ref={ref}
      className="text-input"
      type={type ?? 'text'}
      style={{
        height,
        width,
        ...(paddingLeft && { paddingLeft }),
        ...(paddingRight && { paddingRight }),
      }}
      {...register}
      {...rest}
    />
  ),
);

const Container = styled.div<{ width?: string }>`
  position: relative;
  width: ${({ width }) => width || 'fit-content'};

  /* hide arrows when input type is text */
  > input::-webkit-outer-spin-button,
  > input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  > input[type='number'] {
    -moz-appearance: textfield;
  }

  & > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 12px;
    left: 12px;
    bottom: 12px;
  }

  & > div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 12px;
    right: 12px;
    bottom: 12px;
  }
`;
