'use client';

import React, { useState } from 'react';
import { useShowcase } from './useShowcase';
import { ShowcaseMarkup } from './ShowcaseMarkup';
import { showcaseStyles } from './styles';
import { NavigationHint } from '../NavigationHint';
import { CardLoader } from './card-loader';

export default function CreativeShowcase() {
  const { refs, startShowcase } = useShowcase();
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    startShowcase();
  };

  return (
    <>
      {showLoader && <CardLoader onComplete={handleLoaderComplete} />}
      <ShowcaseMarkup refs={refs} />
      <NavigationHint />
      <style jsx>{showcaseStyles}</style>
    </>
  );
}