export type ElementType =
  | 'ACCESS_CARD'
  | 'SUB_ACCESS_CARD'
  | 'ETHNOGRAPHIC_DESCRIPTION'
  | 'MEDIA_CONTAINER'
  | 'PHYSICS_CALLOUT'
  | 'LEARNING_OBJECTIVES'
  | 'PHASE_GRID'
  | 'TEXT'
  | 'FLIP_CARD';

export type LayoutWidth = 'w-full' | 'w-1/2' | 'w-1/3' | 'w-2/3';

export interface BuilderItem {
  id: string;
  type: ElementType;
  layoutWidth?: LayoutWidth;
  title?: string;
  note?: string;
  phase?: string;
  description?: string;
  colorTheme?: string;
  titleAs?: 'h3' | 'h4';
  value?: Record<string, any>;
  children?: BuilderItem[];
}

export type CardElement = BuilderItem;
