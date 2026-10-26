import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppProvider } from '../context/AppContext';
import type { ResourceItem } from '../types';
import { ResourceViewModal } from './ResourceViewModal';

const resource: ResourceItem = {
  id: 'guide', title: 'Digital Safety Guide', category: 'Safety', format: 'PDF Guide',
  description: 'A practical guide.', readingTime: '5 min', level: 'Beginner',
  targetAudience: 'Learners', keyHighlights: ['Strong passwords'], useCases: ['Personal use'],
  downloadName: 'safety-guide.pdf',
};

describe('ResourceViewModal', () => {
  it('exposes a labelled modal and closes on Escape', () => {
    const onClose = vi.fn();
    render(<AppProvider><ResourceViewModal resource={resource} onClose={onClose} /></AppProvider>);
    expect(screen.getByRole('dialog', { name: resource.title })).toHaveAttribute('aria-modal', 'true');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });
});
