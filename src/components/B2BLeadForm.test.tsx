import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { B2BLeadForm } from './B2BLeadForm';
import { AppProvider } from '../context/AppContext';

const renderForm = () => {
  render(
    <AppProvider>
      <B2BLeadForm />
    </AppProvider>
  );
};

const fillBasics = () => {
  fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'Joyce Mushi' } });
  fireEvent.change(screen.getByLabelText('Work email'), { target: { value: 'joyce@bank.co.tz' } });
};

describe('B2BLeadForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the capture fields with accessible labels', () => {
    renderForm();
    expect(screen.getByLabelText('Your name')).toBeInTheDocument();
    expect(screen.getByLabelText('Work email')).toBeInTheDocument();
    expect(screen.getByLabelText('Sector')).toBeInTheDocument();
    expect(screen.getByLabelText('When do you need this?')).toBeInTheDocument();
    expect(screen.getByLabelText('Team size')).toBeInTheDocument();
  });

  it('updates the team size read-out when the slider moves', () => {
    renderForm();
    expect(screen.getByText('50 staff')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Team size'), { target: { value: '250' } });

    expect(screen.getByText('250 staff')).toBeInTheDocument();
  });

  it('submits the enquiry and shows the confirmation state', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ success: true })
    });

    renderForm();
    fillBasics();
    fireEvent.click(screen.getByRole('button', { name: /get my proposal/i }));

    await waitFor(() => expect(screen.getByText(/proposal request received/i)).toBeInTheDocument());

    const body = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0][1].body;
    expect(body).toContain('teamSize=50');
    expect(body).toContain('email=joyce%40bank.co.tz');
  });

  it('shows an actionable error when the request fails', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(new TypeError('Failed to fetch'));

    renderForm();
    fillBasics();
    fireEvent.click(screen.getByRole('button', { name: /get my proposal/i }));

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.getByRole('alert')).toHaveTextContent(/offline|blocked/i);
  });
});
