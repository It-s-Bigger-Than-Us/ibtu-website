'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';

const VENDOR_TYPES = [
  'Food Truck / Food Vendor',
  'Small Business (retail, beauty, crafts, services)',
  'Nonprofit / Resource Table',
  'Health & Wellness Provider',
  'Education (school, tutoring, after-school)',
  'Community Organization (church, mutual aid)',
  'Government Agency',
  'Healthcare Bus / Mobile Medical Unit',
  'Corporate Brand Activation',
  'Other',
];

const BOOTH_SIZES = [
  'Tabling (single 6ft table + 2 chairs)',
  'Standard Booth (10x10)',
  'Large Booth (10x20)',
  'Food Truck Space',
  'Corporate Activation (custom — describe below)',
];

const EVENTS = [
  'Back 2 School Festival — August 1, 2026',
  'Coastal Care Beach Cleanup (monthly)',
  'Community Wellness / Yoga Series',
  'Food Distribution Events',
  'Giving Season / Holiday Events (Nov–Dec 2026)',
  'Other / Multiple Events',
];

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: '#FFC700',
  fontWeight: 600,
  marginBottom: 8,
  fontFamily: 'var(--font-body)',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  background: '#000',
  border: '1px solid #FFC700',
  color: '#FFF',
  fontSize: 15,
  fontFamily: 'var(--font-body)',
  outline: 'none',
  borderRadius: 0,
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none' as const,
};

const fileInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  background: '#000',
  border: '1px dashed #FFC700',
  color: '#FFF',
  fontSize: 14,
  fontFamily: 'var(--font-body)',
  cursor: 'pointer',
};

const sectionHeadStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 13,
  fontWeight: 700,
  color: '#000',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  marginBottom: 16,
  marginTop: 40,
  paddingBottom: 8,
  borderBottom: '2px solid #000',
};

export default function VendorApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    instagram: '',
    vendorType: '',
    vendorTypeOther: '',
    boothSize: '',
    events: [] as string[],
    description: '',
    previousVendor: '',
    specialRequirements: '',
  });

  const [files, setFiles] = useState<{
    coi1: File | null;
    coi2: File | null;
    waiver: File | null;
    healthPermit: File | null;
    sellersPermit: File | null;
    additionalDoc: File | null;
  }>({
    coi1: null,
    coi2: null,
    waiver: null,
    healthPermit: null,
    sellersPermit: null,
    additionalDoc: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEventToggle = (event: string) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.includes(event)
        ? prev.events.filter((e) => e !== event)
        : [...prev.events, event],
    }));
  };

  const handleFileChange = (key: keyof typeof files) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const body = new FormData();
      body.append('data', JSON.stringify(formData));

      Object.entries(files).forEach(([key, file]) => {
        if (file) body.append(key, file);
      });

      const res = await fetch('/api/vendors/apply', {
        method: 'POST',
        body,
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          background: '#000',
          borderRadius: 16,
          padding: 'clamp(32px, 4vw, 56px)',
          textAlign: 'center',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            textTransform: 'uppercase',
            color: '#FFC700',
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          Thank You.
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            color: '#FFC700',
            lineHeight: 1.6,
            maxWidth: 500,
            margin: '0 auto 20px',
            fontWeight: 600,
          }}
        >
          We are so glad you want to be part of this.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            color: '#FFF',
            lineHeight: 1.8,
            maxWidth: 500,
            margin: '0 auto',
          }}
        >
          Your application is in our hands. We review every single one within
          5 business days — because you took the time to apply, and we take
          that seriously. If you are approved, you will receive a payment link
          and next steps from us via email. If you did not upload your documents
          yet, do not worry — we will walk you through everything after
          approval. You are not doing this alone.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            color: '#FFF',
            lineHeight: 1.8,
            maxWidth: 500,
            margin: '20px auto 0',
          }}
        >
          Thank you for choosing to show up for this community. Thank you for
          trusting IBTU with your brand. And thank you for believing that your
          presence at this event matters — because it does.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: '#FFC700',
            marginTop: 24,
            fontWeight: 600,
          }}
        >
          We are here if you need us: info@itsbiggerthanusla.org | (323) 207-0221
        </p>
      </div>
    );
  }

  const isFoodVendor =
    formData.vendorType === 'Food Truck / Food Vendor';

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#000',
        borderRadius: 16,
        padding: 'clamp(24px, 4vw, 48px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      {/* ── BUSINESS INFO ── */}
      <h3 style={sectionHeadStyle}>
        <span style={{ color: '#FFC700' }}>Tell Us About You</span>
      </h3>

      <div>
        <label htmlFor="businessName" style={labelStyle}>Business / Organization Name *</label>
        <input id="businessName" name="businessName" type="text" required value={formData.businessName} onChange={handleChange} style={inputStyle} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label htmlFor="contactName" style={labelStyle}>Contact Name *</label>
          <input id="contactName" name="contactName" type="text" required value={formData.contactName} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>Email *</label>
          <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label htmlFor="phone" style={labelStyle}>Phone *</label>
          <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="website" style={labelStyle}>Website</label>
          <input id="website" name="website" type="url" value={formData.website} onChange={handleChange} style={inputStyle} placeholder="https://" />
        </div>
      </div>

      <div>
        <label htmlFor="instagram" style={labelStyle}>Instagram Handle</label>
        <input id="instagram" name="instagram" type="text" value={formData.instagram} onChange={handleChange} style={inputStyle} placeholder="@" />
      </div>

      {/* ── VENDOR DETAILS ── */}
      <h3 style={sectionHeadStyle}>
        <span style={{ color: '#FFC700' }}>Help Us Find Your Perfect Fit</span>
      </h3>

      <div>
        <label htmlFor="vendorType" style={labelStyle}>Vendor Type *</label>
        <select id="vendorType" name="vendorType" required value={formData.vendorType} onChange={handleChange} style={selectStyle}>
          <option value="" style={{ background: '#000' }}>Select your vendor type</option>
          {VENDOR_TYPES.map((type) => (
            <option key={type} value={type} style={{ background: '#000' }}>{type}</option>
          ))}
        </select>
      </div>

      {formData.vendorType === 'Other' && (
        <div>
          <label htmlFor="vendorTypeOther" style={labelStyle}>Describe Your Vendor Type *</label>
          <input id="vendorTypeOther" name="vendorTypeOther" type="text" required value={formData.vendorTypeOther} onChange={handleChange} style={inputStyle} />
        </div>
      )}

      <div>
        <label htmlFor="boothSize" style={labelStyle}>Booth Size Preference *</label>
        <select id="boothSize" name="boothSize" required value={formData.boothSize} onChange={handleChange} style={selectStyle}>
          <option value="" style={{ background: '#000' }}>Select booth size</option>
          {BOOTH_SIZES.map((size) => (
            <option key={size} value={size} style={{ background: '#000' }}>{size}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Which Event(s) Are You Applying For? *</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {EVENTS.map((event) => (
            <label
              key={event}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: '#FFF',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={formData.events.includes(event)}
                onChange={() => handleEventToggle(event)}
                style={{ accentColor: '#FFC700', width: 18, height: 18 }}
              />
              {event}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="description" style={labelStyle}>Describe What You Sell / Offer *</label>
        <textarea id="description" name="description" rows={4} required value={formData.description} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Products, services, or resources you'll provide at your booth" />
      </div>

      <div>
        <label htmlFor="previousVendor" style={labelStyle}>Have You Participated in an IBTU Event Before?</label>
        <select id="previousVendor" name="previousVendor" value={formData.previousVendor} onChange={handleChange} style={selectStyle}>
          <option value="" style={{ background: '#000' }}>Select</option>
          <option value="yes" style={{ background: '#000' }}>Yes — returning vendor</option>
          <option value="no" style={{ background: '#000' }}>No — first time</option>
        </select>
      </div>

      <div>
        <label htmlFor="specialRequirements" style={labelStyle}>Special Requirements (electricity, water, extra space, etc.)</label>
        <textarea id="specialRequirements" name="specialRequirements" rows={3} value={formData.specialRequirements} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }} />
      </div>

      {/* ── DOCUMENT UPLOADS ── */}
      <h3 style={sectionHeadStyle}>
        <span style={{ color: '#FFC700' }}>Your Documents</span>
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#FFC700', margin: '-8px 0 8px', lineHeight: 1.6 }}>
        Upload now if you have them — or skip this part and we will help you gather everything after you are approved. We want to make this as easy as possible for you. Accepted formats: PDF, JPG, PNG. Max 10MB per file.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={labelStyle}>Certificate of Insurance #1</label>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange('coi1')} style={fileInputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Certificate of Insurance #2</label>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange('coi2')} style={fileInputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Signed Liability Waiver</label>
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange('waiver')} style={fileInputStyle} />
      </div>

      {isFoodVendor && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>Health Permit (TFF / Food Handler)</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange('healthPermit')} style={fileInputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Seller&apos;s Permit</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange('sellersPermit')} style={fileInputStyle} />
          </div>
        </div>
      )}

      <div>
        <label style={labelStyle}>Additional Document (W-9, business license, etc.)</label>
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange('additionalDoc')} style={fileInputStyle} />
      </div>

      {/* ── SUBMIT ── */}
      {error && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#FF4444', margin: 0 }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        style={{
          alignSelf: 'flex-start',
          background: '#FFC700',
          color: '#000',
          padding: '18px 48px',
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontWeight: 700,
          border: 'none',
          cursor: submitting ? 'wait' : 'pointer',
          borderRadius: 0,
          marginTop: 16,
          opacity: submitting ? 0.6 : 1,
        }}
      >
        {submitting ? 'Submitting...' : 'Submit Application \u2192'}
      </button>

      <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#FFC700', margin: 0, lineHeight: 1.6 }}>
        By submitting, you agree to IBTU&apos;s vendor terms and conditions.
        All fees are non-refundable after approval. We review your application
        within 5 business days. Thank you for your time — we know you are busy,
        and we are honored you chose to spend it here.
      </p>
    </form>
  );
}
