import { DropItem, DropOperation } from 'react-aria-components';

interface DragDropEvent {
  /** The x coordinate of the event, relative to the target element. */
  x: number;
  /** The y coordinate of the event, relative to the target element. */
  y: number;
}

export interface DropEvent extends DragDropEvent {
  /** The event type. */
  type: 'drop';
  /** The drop operation that should occur. */
  dropOperation: DropOperation;
  /** The dropped items. */
  items: DropItem[];
}

export const dragTypeConstant = {
  text: 'text/plain',
} as const;

export const errorToastEnum = {
  maximum: 'Maximum number of activities for a given day selected.',
} as const;
