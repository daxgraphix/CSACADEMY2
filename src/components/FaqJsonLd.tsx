import React from 'react';
import { buildFaqSchema, FaqSchemaItem } from '../utils/schema';

interface FaqJsonLdProps {
  items: FaqSchemaItem[];
}

/**
 * Renders FAQPage JSON-LD. Kept separate from the visible accordion so the
 * same source list drives both the markup and the structured data.
 */
export const FaqJsonLd: React.FC<FaqJsonLdProps> = ({ items }) => {
  if (!items.length) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(items)) }}
    />
  );
};
