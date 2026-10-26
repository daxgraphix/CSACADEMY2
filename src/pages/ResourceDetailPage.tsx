import React from 'react';
import { resourcesData } from '../data/resources';
import { EditorialDetailPage } from './EditorialDetailPage';

interface ResourceDetailPageProps {
  slug: string;
  openBookingModal: (prefill?: { program?: string }) => void;
}

export const ResourceDetailPage: React.FC<ResourceDetailPageProps> = ({ slug, openBookingModal }) => (
  <EditorialDetailPage
    resource={resourcesData.find((item) => item.id === slug)}
    openBookingModal={openBookingModal}
  />
);
