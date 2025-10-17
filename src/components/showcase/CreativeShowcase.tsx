'use client';

import React from 'react';
import { useShowcase } from './useShowcase';
import { ShowcaseMarkup } from './ShowcaseMarkup';
import { showcaseStyles } from './styles';

export default function CreativeShowcase() {
  const { refs } = useShowcase();

  return (
    <>
      <ShowcaseMarkup refs={refs} />
      <style jsx>{showcaseStyles}</style>
    </>
  );
}