import React, { use } from 'react';
import { GridBuilder } from '@/components/shared/grid-builder';

interface BuilderEditorPageProps {
  params: Promise<{
    sceneId: string;
  }>;
}

export default function BuilderEditorPage({ params }: BuilderEditorPageProps) {
  const resolvedParams = use(params);

  return (
    <div className="min-h-screen bg-background p-6">
      <GridBuilder sceneId={resolvedParams.sceneId} />
    </div>
  );
}
