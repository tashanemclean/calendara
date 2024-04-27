export type ButtonStyle = (typeof buttonStyle)[keyof typeof buttonStyle];

export const buttonStyle = {
  disabled: 'disabled',
  bordered: 'bordered',
  primary: 'primary',
};
