import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { TextMD, TextSM } from '../../typography';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  text?: string;
  caption?: string;
  value?: string;
  disabled?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(({ name, text, caption, value, disabled }: Props, ref) => {
  const [checked, setIsChecked] = useState(false);
  const onToggle = () => {
    setIsChecked(!checked);
  };
  return (
    <Container>
      <Input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onToggle}
        ref={ref}
      />
      <LabelContainer>
        {text ? <TextMD.Medium>{text}</TextMD.Medium> : null}
        {caption ? <Caption>{caption}</Caption> : null}
      </LabelContainer>
    </Container>
  );
});
Checkbox.displayName = 'Checkbox';

const Container = styled.span`
  display: grid;
  box-sizing: border-box;
  justify-content: start;
  grid-template-columns: repeat(2, auto);
  align-items: start;
  gap: 10px;
`;

const Input = styled.input`
  -webkit-appearance: none;
  appearance: none;
  display: grid;
  place-content: center;

  &::before {
    position: relative;
    display: block;
    box-sizing: border-box;
    place-content: center;
    width: 24px;
    height: 24px;
    background: url("data:image/svg+xml,%3Csvg fill='none' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg' id='fi_8924271'%3E%3Cpath clip-rule='evenodd' d='m18 4.5h-12c-.82843 0-1.5.67157-1.5 1.5v12c0 .8284.67157 1.5 1.5 1.5h12c.8284 0 1.5-.6716 1.5-1.5v-12c0-.82843-.6716-1.5-1.5-1.5zm-12-1.5c-1.65685 0-3 1.34315-3 3v12c0 1.6569 1.34315 3 3 3h12c1.6569 0 3-1.3431 3-3v-12c0-1.65685-1.3431-3-3-3z' fill='rgb(0,0,0)' fill-rule='evenodd'%3E%3C/path%3E%3C/svg%3E");
    content: '';
  }

  &:checked::before {
    position: relative;
    display: block;
    box-sizing: border-box;
    place-content: center;
    width: 24px;
    height: 24px;
    background: url("data:image/svg+xml,%3Csvg height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg' id='fi_2618312'%3E%3Cg id='Layer_46' data-name='Layer 46'%3E%3Cpath d='m19 2h-14a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-14a3 3 0 0 0 -3-3zm1 17a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1-1v-14a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1zm-2.33-11.72a1 1 0 0 1 0 1.41l-7.46 7.94a1 1 0 0 1 -.73.31 1 1 0 0 1 -.73-.31l-2.44-2.63a1 1 0 1 1 1.45-1.37l1.76 1.87 6.73-7.16a1 1 0 0 1 1.42-.06z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    content: '';
  }
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 3px;
`;

const Caption = styled(TextSM.Medium)`
  color: ${colors.Black[600]};
`;
