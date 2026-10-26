import { siteConfig } from '../config/site';

/**
 * Single source of truth for the endpoint that receives form submissions.
 *
 * FormSubmit provides serverless form-to-email delivery. It may require a
 * one-time activation email before accepting the first inquiry.
 */
export const BOOKING_ENDPOINT = `https://formsubmit.co/ajax/${siteConfig.email}`;

export interface SubmitResult {
  ok: boolean;
  needsActivation?: boolean;
  errorMessage?: string;
}

/**
 * POST a form-encoded payload to BOOKING_ENDPOINT.
 * Never throws. Callers get a structured result they can render.
 */
export const submitForm = async (fields: Record<string, string>): Promise<SubmitResult> => {
  if (!BOOKING_ENDPOINT) {
    return { ok: false, errorMessage: 'The booking endpoint is not configured.' };
  }

  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(fields)) {
    body.set(key, value);
  }

  let res: Response;
  try {
    res = await fetch(BOOKING_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      },
      body: body.toString()
    });
  } catch (networkErr) {
    const raw = networkErr instanceof Error ? networkErr.message.toLowerCase() : '';
    let friendly = 'Could not reach FormSubmit. Please try again in a moment.';
    if (raw.includes('failed to fetch') || raw.includes('networkerror') || raw.includes('network request failed')) {
      friendly = 'You appear to be offline, or your browser blocked the request. Check your connection and try again.';
    } else if (raw.includes('timeout') || raw.includes('timed out')) {
      friendly = 'FormSubmit took too long to respond. Please try again.';
    } else if (raw.includes('cors') || raw.includes('access-control')) {
      friendly = 'Your browser blocked the request. Please try again, or contact us on WhatsApp.';
    }
    return { ok: false, errorMessage: friendly };
  }

  let data: { success?: string | boolean; message?: string } = {};
  try {
    const text = await res.text();
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  const ok = data.success === true || data.success === 'true';
  if (!res.ok || !ok) {
    const message = (data.message || '').toLowerCase();
    if (message.includes('activation')) {
      return {
        ok: false,
        needsActivation: true,
        errorMessage:
          'This site still needs a one-time form activation. CS Academy has been emailed an activation link. Once it is clicked, submissions deliver automatically.'
      };
    }
    return {
      ok: false,
      errorMessage: data.message || `FormSubmit returned status ${res.status}. Please try again.`
    };
  }

  return { ok: true };
};
