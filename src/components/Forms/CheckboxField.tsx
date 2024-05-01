// import { Control, Controller, ControllerRenderProps, FieldValues } from 'react-hook-form';
// import styled from 'styled-components';
// import { colors } from '../../constants/colors';
// import { IconContainer } from '../../utils/common/style';
// import { TextButton } from '../Buttons';
// import { SlideIn } from '../Transitions/SlideIn';
// import { Checkbox } from '../Checkbox';
// import { ChangeEvent, ChangeEventHandler, MouseEvent, useCallback, useRef, useState } from 'react';
// import { ExpandMoreIcon } from '../Icons';
// import { ClickOutside } from '../Dropdown';

// interface CheckboxFieldProps {
//   control: Control<FieldValues, unknown>;
//   errorMessage?: string;
//   id: string;
//   isRequired?: boolean;
//   label: string;
//   value?: string[];
//   containerWidth?: string;
//   items: string[];
// }

// export const CheckboxField = ({ control, id, isRequired, label, value, items }: CheckboxFieldProps) => {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const clickHandler = useCallback(() => {
//     setOpen(!open);
//   }, [open, setOpen]);

//   const closeHandler = useCallback(() => {
//     setOpen(false);
//   }, [setOpen]);

//   const handleChange = (item: DropdownItem) => {
//     console.log(item, 'should update data');
//   };
//   const renderCheckbox = (field: ControllerRenderProps<FieldValues, string>) =>
//     items.map((item, key) => (
//       <Checkbox
//         {...field}
//         key={`${item + key}`}
//         text={item}
//         onClick={handleChange}
//       />
//     ));
//   return (
//     <ClickOutside
//       enabled={open}
//       onClick={closeHandler}
//     >
//       <Controller
//         control={control}
//         defaultValue={value ?? ''}
//         name={id}
//         rules={{
//           required: isRequired,
//         }}
//         render={({ field }) => (
//           <>
//             <TextButton
//               className="checkbox-btn"
//               text={label}
//               onClick={clickHandler}
//               iconRight={
//                 <IconContainer>
//                   <ExpandMoreIcon color={colors.Space[500]} />
//                 </IconContainer>
//               }
//               overrideTextColor={colors.Space[500]}
//             />
//             <CheckboxDropdown ref={dropdownRef}>
//               <SlideIn enter={open}>{renderCheckbox(field)}</SlideIn>
//             </CheckboxDropdown>
//           </>
//         )}
//       />
//     </ClickOutside>
//   );
// };

// const CheckboxDropdown = styled.div`
//   position: relative;
//   display: block;
//   width: max-content;
//   z-index: 100;
// `;
