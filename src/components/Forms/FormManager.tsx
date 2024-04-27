import { useMount } from '@lilib/hooks';
import React, { ReactNode } from 'react';
import { Control, FieldValues, useForm, UseFormClearErrors, UseFormReturn } from 'react-hook-form';

interface RenderFuncArgs {
  clearErrors: UseFormClearErrors<FieldValues>;
  control: Control<FieldValues, unknown>;
  hook: UseFormReturn<FieldValues, unknown>;
  isSubmitting: boolean;
  onReset: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

interface FormRootProps {
  defaultValues?: Record<string, unknown>;
  onRegisterClear?: (cb: () => void) => void;
  onSubmit: (_: FieldValues) => Promise<void>;
  render: (data: RenderFuncArgs) => ReactNode | ReactNode[];
}

const FormManager = ({ defaultValues = {}, onRegisterClear, onSubmit, render }: FormRootProps) => {
  const hook = useForm();
  const { clearErrors, control, formState } = hook;

  const handleReset = () => {
    hook.reset(defaultValues ?? {});
  };

  /**
   * register clear handler for parent
   *
   * Example (parent hook):
   *   const clearRef = useRef({ callback: () => {} });
   *   const onClearForm = (callback: () => void) => {
   *     clearRef.current.callback = callback;
   *   };
   *   const onSaveForm = async ({}: FormValues) => {
   *     ...
   *     clearRef.current.callback();
   *   };
   *
   * Example (FormRoot JSX)
   *   <FormRoot
   *     onRegisterClear={onClearForm}
   *     ...
   *   />
   * */
  useMount(() => {
    onRegisterClear?.(handleReset);
  });

  return (
    <>
      {render({
        clearErrors,
        control,
        hook,
        isSubmitting: formState.isSubmitting,
        onReset: handleReset,
        onSubmit: hook.handleSubmit(onSubmit),
      })}
    </>
  );
};

export default FormManager;
