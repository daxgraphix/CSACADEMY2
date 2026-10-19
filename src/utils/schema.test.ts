import { describe, expect, it } from 'vitest';
import { buildFaqSchema, buildOrganizationSchema } from './schema';

describe('buildFaqSchema', () => {
  it('produces a valid FAQPage payload', () => {
    const schema = buildFaqSchema([
      { question: 'How much is it?', answer: 'TSh 50,000 per month.' }
    ]);

    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(1);
    expect(schema.mainEntity[0].name).toBe('How much is it?');
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe('TSh 50,000 per month.');
  });

  it('returns an empty question list for no items', () => {
    expect(buildFaqSchema([]).mainEntity).toEqual([]);
  });
});

describe('buildOrganizationSchema', () => {
  it('emits an EducationalOrganization with contact details', () => {
    const schema = buildOrganizationSchema({
      name: 'CS ACADEMY',
      url: 'https://academy.cyberswahili.co.tz',
      email: 'support@cyberswahili.co.tz',
      telephone: '+255753969379',
      foundingDate: '2026',
      address: { addressLocality: 'Dar es Salaam', addressCountry: 'TZ' },
      sameAs: ['https://www.linkedin.com/in/alexrweyemamu/']
    });

    expect(schema['@type']).toBe('EducationalOrganization');
    expect(schema.address).toMatchObject({
      '@type': 'PostalAddress',
      addressLocality: 'Dar es Salaam'
    });
    expect(schema.sameAs).toHaveLength(1);
  });

  it('omits optional fields that were not supplied', () => {
    const schema = buildOrganizationSchema({
      name: 'CS ACADEMY',
      url: 'https://academy.cyberswahili.co.tz',
      email: 'support@cyberswahili.co.tz',
      telephone: '+255753969379'
    });

    expect(schema).not.toHaveProperty('foundingDate');
    expect(schema).not.toHaveProperty('address');
    expect(schema).not.toHaveProperty('sameAs');
  });
});
