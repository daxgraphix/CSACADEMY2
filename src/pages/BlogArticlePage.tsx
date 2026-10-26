import React from 'react';
import { blogPostsData } from '../data/blog';
import { EditorialDetailPage } from './EditorialDetailPage';

interface BlogArticlePageProps {
  slug: string;
  openBookingModal: (prefill?: { program?: string }) => void;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({ slug, openBookingModal }) => (
  <EditorialDetailPage
    post={blogPostsData.find((item) => item.slug === slug)}
    openBookingModal={openBookingModal}
  />
);
