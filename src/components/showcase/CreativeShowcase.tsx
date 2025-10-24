'use client';

import React from 'react';
import { useShowcase } from './useShowcase';
import { ShowcaseMarkup } from './ShowcaseMarkup';
import { showcaseStyles } from './styles';
import { NavigationHint } from '../NavigationHint';

export default function CreativeShowcase() {
  const { refs } = useShowcase();

  return (
    <>
      <ShowcaseMarkup refs={refs} />
      <NavigationHint />
      <style jsx>{showcaseStyles}</style>
    </>
  );
}