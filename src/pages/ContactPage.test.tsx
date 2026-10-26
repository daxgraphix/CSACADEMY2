import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ContactPage } from '../pages/ContactPage';
import { AppProvider } from '../context/AppContext';

const mockSubmit = vi.hoisted(() => vi.fn());

vi.mock('../utils/booking', () => ({
  submitForm: (...args: unknown[]) => mockSubmit(...args)
}));

const renderContact = () =>
  render(
    <MemoryRouter>
      <AppProvider>
        <ContactPage openBookingModal={vi.fn()} />
      </AppProvider>
    </MemoryRouter>
  );

describe('ContactPage form', () => {
  it('renders every field with an associated label', () => {
    renderContact();
    expect(screen.getByLabelText('Your Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Company / University / Self')).toBeInTheDocument();
    expect(screen.getByLabelText('Preferred Delivery Format')).toBeInTheDocument();
    expect(screen.getByLabelText('Program Track of Interest')).toBeInTheDocument();
    expect(screen.getByLabelText('Objectives & Notes')).toBeInTheDocument();
  });

  it('submits the enquiry and shows the confirmation state', async () => {
    mockSubmit.mockResolvedValue({ ok: true });

    renderContact();
    fireEvent.change(screen.getByLabelText('Your Full Name'), { target: { value: 'Neema K' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'neema@org.co.tz' } });
    fireEvent.change(screen.getByLabelText('Objectives & Notes'), { target: { value: 'Looking for a team cohort.' } });

    fireEvent.click(screen.getByRole('button', { name: /submit training inquiry/i }));

    await waitFor(() => {
      expect(screen.getByText(/inquiry sent/i)).toBeInTheDocument();
    });

    const fields = mockSubmit.mock.calls[0][0];
    expect(fields.email).toBe('neema@org.co.tz');
    expect(fields.message).toContain('team cohort');
  });

  it('shows an error when the request fails', async () => {
    mockSubmit.mockResolvedValue({
      ok: false,
      errorMessage: 'Could not reach the server. Please try again.'
    });

    renderContact();
    fireEvent.change(screen.getByLabelText('Your Full Name'), { target: { value: 'Neema K' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'neema@org.co.tz' } });

    fireEvent.click(screen.getByRole('button', { name: /submit training inquiry/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
    expect(screen.getByRole('alert')).toHaveTextContent(/could not reach/i);
  });
});