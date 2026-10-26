import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { submitForm } from './booking';

const okResponse = (body: unknown) => ({
  ok: true,
  status: 200,
  text: async () => JSON.stringify(body)
});

describe('submitForm', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts a form-encoded payload and reports success', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      okResponse({ success: true })
    );

    const result = await submitForm({ email: 'learner@example.com', interest: 'AI' });

    expect(result.ok).toBe(true);

    const [url, init] = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(String(url)).toContain('formsubmit.co');
    expect(init.method).toBe('POST');
    expect(init.headers['Content-Type']).toBe('application/x-www-form-urlencoded');
    expect(init.body).toContain('email=learner%40example.com');
    expect(init.body).toContain('interest=AI');
  });

  it('flags the one-time activation state instead of failing silently', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => JSON.stringify({ success: false, message: 'Activation required' })
    });

    const result = await submitForm({ email: 'learner@example.com' });

    expect(result.ok).toBe(false);
    expect(result.needsActivation).toBe(true);
    expect(result.errorMessage).toMatch(/activation/i);
  });

  it('returns a friendly message when the network fails', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new TypeError('Failed to fetch')
    );

    const result = await submitForm({ email: 'learner@example.com' });

    expect(result.ok).toBe(false);
    expect(result.needsActivation).toBeUndefined();
    expect(result.errorMessage).toMatch(/offline|blocked/i);
  });

  it('surfaces the server message when the request is rejected', async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 400,
      text: async () => JSON.stringify({ success: false, message: 'Invalid address' })
    });

    const result = await submitForm({ email: 'not-an-email' });

    expect(result.ok).toBe(false);
    expect(result.errorMessage).toBe('Invalid address');
  });
});
