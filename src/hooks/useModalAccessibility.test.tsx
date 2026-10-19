import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useModalAccessibility } from './useModalAccessibility';

function Dialog({ onClose }: { onClose: () => void }) {
  useModalAccessibility(true, onClose);
  return <div role="dialog" aria-modal="true" tabIndex={-1}><button>First</button><button>Last</button></div>;
}

describe('modal accessibility', () => {
  it('traps tab focus and handles Escape', () => {
    const onClose = vi.fn();
    render(<Dialog onClose={onClose} />);
    const first = screen.getByRole('button', { name: 'First' });
    const last = screen.getByRole('button', { name: 'Last' });
    last.focus(); fireEvent.keyDown(document, { key: 'Tab' });
    expect(first).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });
  it('restores focus when the dialog closes', () => {
    const trigger = document.createElement('button'); document.body.append(trigger); trigger.focus();
    const { unmount } = render(<Dialog onClose={() => {}} />);
    unmount(); expect(trigger).toHaveFocus(); trigger.remove();
  });
});
