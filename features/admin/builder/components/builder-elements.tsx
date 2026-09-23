'use client';

import React from 'react';
import { BuilderItem } from '../types/builder';
import { ModuleHeaderElement } from './elements/module-header-element';
import { MediaContainerElement } from './elements/media-container-element';
import { CalloutElement } from './elements/callout-element';
import { LearningObjectivesElement } from './elements/learning-objectives-element';
import { PhaseGridElement } from './elements/phase-grid-element';
import { BottomActionBarElement } from './elements/bottom-action-bar-element';
import { TextElement } from './elements/text-element';
import { FlipCardElement } from './elements/flip-card-element';

interface BuilderElementRendererProps {
  item: BuilderItem;
  onUpdate: (id: string, field: string, val: any) => void;
  isEditable?: boolean;
}

export function BuilderElementRenderer({
  item,
  onUpdate,
  isEditable = true,
}: BuilderElementRendererProps) {
  const { id, type, value = {} } = item;

  switch (type) {
    case 'MODULE_HEADER':
      return (
        <ModuleHeaderElement
          badgeText={value.badgeText}
          title={value.title}
          descriptionTitle={value.descriptionTitle}
          descriptionText={value.descriptionText}
          isEditable={isEditable}
          onUpdate={(field, val) =>
            onUpdate(id, 'value', { ...value, [field]: val })
          }
        />
      );

    case 'MEDIA_CONTAINER':
      return (
        <MediaContainerElement
          headerBadge={value.headerBadge}
          placeholderText={value.placeholderText}
          tags={value.tags}
          isEditable={isEditable}
          onUpdate={(field, val) =>
            onUpdate(id, 'value', { ...value, [field]: val })
          }
        />
      );

    case 'CALLOUT':
      return (
        <CalloutElement
          badgeText={value.badgeText}
          questionText={value.questionText}
          isEditable={isEditable}
          onUpdate={(field, val) =>
            onUpdate(id, 'value', { ...value, [field]: val })
          }
        />
      );

    case 'LEARNING_OBJECTIVES':
      return (
        <LearningObjectivesElement
          title={value.title}
          items={value.items}
          isEditable={isEditable}
          onUpdate={(newItems) =>
            onUpdate(id, 'value', { ...value, items: newItems })
          }
        />
      );

    case 'PHASE_GRID':
      return (
        <PhaseGridElement
          title={value.title}
          phases={value.phases}
        />
      );

    case 'BOTTOM_ACTION_BAR':
      return (
        <BottomActionBarElement
          leftText={value.leftText}
          rightText={value.rightText}
        />
      );

    case 'TEXT':
      return (
        <TextElement
          element={{ id, type: 'TEXT', value }}
          cardId={id}
          onUpdateValue={(_, elementId, newVal) =>
            onUpdate(elementId, 'value', { ...value, ...newVal })
          }
        />
      );

    case 'FLIP_CARD':
      return (
        <FlipCardElement
          element={{ id, type: 'FLIP_CARD', value }}
          cardId={id}
          onUpdateValue={(_, elementId, newVal) =>
            onUpdate(elementId, 'value', { ...value, ...newVal })
          }
        />
      );

    default:
      return null;
  }
}
