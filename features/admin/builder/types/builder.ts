export type ElementType =
  | 'ACCESS_CARD'
  | 'MODULE_HEADER'
  | 'MEDIA_CONTAINER'
  | 'CALLOUT'
  | 'LEARNING_OBJECTIVES'
  | 'PHASE_GRID'
  | 'BOTTOM_ACTION_BAR'
  | 'TEXT'
  | 'FLIP_CARD';

export interface BuilderItem {
  id: string;
  type: ElementType;
  colSpan?: number;
  title?: string;
  note?: string;
  phase?: string;
  description?: string;
  colorTheme?: string;
  value?: Record<string, any>;
  children?: BuilderItem[];
}

export type CardElement = BuilderItem;
