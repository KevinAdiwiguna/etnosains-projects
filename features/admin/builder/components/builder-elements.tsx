'use client';

import React from 'react';
import { BuilderItem } from '../types/builder';
import { EthnographicDescription } from './elements/ethnographic-description';
import { MediaContainer } from './elements/media-container';
import { PhysicsCallout } from './elements/physics-callout';
import { LearningObjectives } from './elements/learning-objectives';
import { PhaseGrid } from './elements/phase-grid';
import { EssayQuestion } from './elements/essay-question';
import { InfoCalloutBar } from './info-callout-bar';
import { MultipleChoiceQuiz } from './elements/multiple-choice-quiz';
import { FlipCardElement } from './elements/flip-card-elements';
// import { TextElement } from './elements/text-element';
// import { FlipCardElement } from './elements/flip-card-element';

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
    case 'ETHNOGRAPHIC_DESCRIPTION':
      return (
        <EthnographicDescription
          badgeText={value.badgeText}
          descriptionText={value.descriptionText}
          isEditable={isEditable}
          onChange={(val) => onUpdate(id, 'value', { ...value, ...val })}
        />
      );

    case 'MEDIA_CONTAINER':
      return (
        <MediaContainer
          headerTagText={value.headerTagText}
          placeholderText={value.placeholderText}
          badges={value.badges}
          isEditable={isEditable}
          onChange={(val) => onUpdate(id, 'value', { ...value, ...val })}
        />
      );

    case 'PHYSICS_CALLOUT':
      return (
        <PhysicsCallout
          badgeText={value.badgeText}
          questionText={value.questionText}
          isEditable={isEditable}
          onChange={(val) => onUpdate(id, 'value', { ...value, ...val })}
        />
      );

    case 'LEARNING_OBJECTIVES':
      return (
        <LearningObjectives
          headerTitle={value.headerTitle}
          items={value.items}
          isEditable={isEditable}
          onChange={(val) => onUpdate(id, 'value', { ...value, ...val })}
        />
      );

    case 'PHASE_GRID':
      return (
        <PhaseGrid
          headerTitle={value.headerTitle}
          phases={value.phases}
          isEditable={isEditable}
          onChange={(val) => onUpdate(id, 'value', { ...value, ...val })}
        />
      );
    case 'FLIP_CARD':
      return (
        <FlipCardElement
          frontTitle={value.frontTitle}
          frontSub={value.frontSub}
          backTitle={value.backTitle}
          backText={value.backText}
          isEditable={isEditable}
          onChange={(val) => onUpdate(id, 'value', { ...value, ...val })}
        />
      );

    case 'MULTIPLE_CHOICE':
      return (
        <MultipleChoiceQuiz
          questionNumber={value.questionNumber}
          questionText={value.questionText}
          options={value.options}
          correctAnswerId={value.correctAnswerId}
          isEditable={isEditable}
          onChange={(val) => onUpdate(id, 'value', { ...value, ...val })}
        />
      );

    case 'ESSAY_QUESTION':
      return (
        <EssayQuestion
          questionNumber={value.questionNumber}
          questionText={value.questionText}
          correctAnswerRubric={value.correctAnswerRubric}
          isEditable={isEditable}
          onChange={(val) => onUpdate(id, 'value', { ...value, ...val })}
        />
      );

    case 'INFO_CALLOUT_BAR':
      return (
        <InfoCalloutBar
          titleText={value.titleText}
          descriptionText={value.descriptionText}
          isEditable={isEditable}
          onChange={(val) => onUpdate(id, 'value', { ...value, ...val })}
        />
      );

    // case 'TEXT':
    //   return (
    //     <TextElement
    //       title={value.title}
    //       text={value.text}
    //       isEditable={isEditable}
    //       onChange={(val) => onUpdate(id, 'value', { ...value, ...val })}
    //     />
    //   );

    // case 'FLIP_CARD':
    //   return (
    //     <FlipCardElement
    //       frontTitle={value.frontTitle}
    //       frontSub={value.frontSub}
    //       backTitle={value.backTitle}
    //       backText={value.backText}
    //       isEditable={isEditable}
    //       onChange={(val) => onUpdate(id, 'value', { ...value, ...val })}
    //     />
    //   );

    default:
      return null;
  }
}
