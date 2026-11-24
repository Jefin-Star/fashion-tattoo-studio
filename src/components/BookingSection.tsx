import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Upload, CheckCircle2, AlertCircle, Trash2, MessageCircle } from 'lucide-react';
import { STUDIO_CONFIG, getWhatsAppUrl } from '../config/studioConfig';

interface BookingSectionProps {
  preselectedArtist: string;
  preselectedIdea: string;
  preselectedPlacement: string;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  tattooIdea: string;
  tattooSize: string;
  placement: string;
  preferredArtist: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  tattooIdea?: string;
  placement?: string;
}

const PLACEMENT_OPTIONS = [
  'Forearm',
  'Upper Arm / Sleeve',
  'Shoulder / Collarbone',
  'Back / Spine',
  'Wrist / Hand',
  'Chest / Ribs',
  'Leg / Calf',
  'Ear / Nose / Body Piercing',
  'Other (Specify in idea)',
];

export function BookingSection({
  preselectedArtist,
  preselectedIdea,
  preselectedPlacement,
}: BookingSectionProps) {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    tattooIdea: '',
    tattooSize: '',
    placement: '',
    preferredArtist: 'Any Available Senior Artist',
  });

  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [referencePreview, setReferencePreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedData, setSubmittedData] = useState<FormState | null>(null);

  // Sync external pre-selections when clicking an artist card or portfolio piece
  useEffect(() => {
    if (preselectedArtist || preselectedIdea || preselectedPlacement) {
      setForm((prev) => ({
        ...prev,
        preferredArtist: preselectedArtist || prev.preferredArtist,
        tattooIdea: preselectedIdea || prev.tattooIdea,
        placement: preselectedPlacement || prev.placement,
      }));
      setSubmittedData(null);
    }
  }, [preselectedArtist, preselectedIdea, preselectedPlacement]);

  useEffect(() => {
    return () => {
      if (referencePreview) {
        URL.revokeObjectURL(referencePreview);
      }
    };
  }, [referencePreview]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setFileError('Please upload a JPG, PNG, or WEBP reference image.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError('Reference image must be under 10 MB.');
      return;
    }

    if (referencePreview) URL.revokeObjectURL(referencePreview);
    setReferenceFile(file);
    setReferencePreview(URL.createObjectURL(file));
  };

  const removeReferenceImage = () => {
    if (referencePreview) URL.revokeObjectURL(referencePreview);
    setReferenceFile(null);
    setReferencePreview(null);
    setFileError(null);
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      next.fullName = 'Please enter your full name.';
    }
    const cleanPhone = form.phone.replace(/[\s\-()]/g, '');
    if (!cleanPhone || !/^\+?\d{8,15}$/.test(cleanPhone)) {
      next.phone = 'Enter a valid 10-digit phone or WhatsApp number.';
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Enter a valid email address.';
    }
    if (!form.tattooIdea.trim()) {
      next.tattooIdea = 'Describe your tattoo concept or piercing request.';
    }
    if (!form.placement.trim()) {
      next.placement = 'Select or enter a body placement.';
    }
    return next;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmittedData({ ...form });
  };

  const buildWhatsAppBookingLink = (data: FormState) => {
    const lines = [
      `Hello Fashion Tattoo Studio! I would like to book a consultation:`,
      `Name: ${data.fullName}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Idea: ${data.tattooIdea}`,
      data.tattooSize ? `Approx. Size: ${data.tattooSize}` : '',
      `Placement: ${data.placement}`,
      `Preferred Artist: ${data.preferredArtist}`,
      referenceFile ? `Reference Image: ${referenceFile.name} (I can share it here)` : '',
    ].filter(Boolean);
    return getWhatsAppUrl(lines.join('\n'));
  };

  return (
    <section
      id="booking"
      className="py-20 lg:py-28 bg-[#0C0C0F] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Guidance & Pricing Summary */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#E03E24] mb-3">
                Book Consultation
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                Reserve your session with our artists.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Share your concept, approximate size, placement, and any reference image. Our team
                reviews every request and responds promptly during studio hours.
              </p>
            </div>

            <div className="border-t border-white/[0.08] pt-6 space-y-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-zinc-400">Custom Tattoos</span>
                <span className="font-mono-tabular text-lg font-semibold text-white">
                  From {STUDIO_CONFIG.pricing.tattooStarting}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-zinc-400">Precision Piercings</span>
                <span className="font-mono-tabular text-lg font-semibold text-white">
                  From {STUDIO_CONFIG.pricing.piercingStarting}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-zinc-400">Studio Hours</span>
                <span className="font-mono-tabular text-sm font-medium text-zinc-200">
                  {STUDIO_CONFIG.hours.time}
                </span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#121216] border border-white/[0.08] space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Walk-Ins &amp; Custom Stencils
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Walk-ins are welcome daily between 10 AM and 8 PM. Booking ahead guarantees
                dedicated time with your preferred artist for custom drawing and stencil prep.
              </p>
            </div>
          </div>

          {/* Right Form Container */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-9 rounded-xl bg-[#121216] border border-white/[0.08]">
              {submittedData ? (
                <div className="space-y-6 py-4">
                  <div className="flex items-start gap-3.5">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-white mb-1">
                        Consultation Request Prepared
                      </h3>
                      <p className="text-sm text-zinc-400">
                        Thank you, {submittedData.fullName}. Your consultation details are ready—send
                        them directly to our WhatsApp desk for instant confirmation.
                      </p>
                    </div>
                  </div>

                  <dl className="divide-y divide-white/[0.08] border-y border-white/[0.08] text-sm">
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-zinc-400">Client</dt>
                      <dd className="text-white font-medium text-right">
                        {submittedData.fullName} · {submittedData.phone}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-zinc-400">Email</dt>
                      <dd className="text-white text-right">{submittedData.email}</dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-zinc-400">Tattoo Idea &amp; Size</dt>
                      <dd className="text-white text-right max-w-xs">
                        {submittedData.tattooIdea}
                        {submittedData.tattooSize ? ` (${submittedData.tattooSize})` : ''}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-zinc-400">Placement</dt>
                      <dd className="text-white text-right">{submittedData.placement}</dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-zinc-400">Preferred Artist</dt>
                      <dd className="text-white text-right">{submittedData.preferredArtist}</dd>
                    </div>
                  </dl>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={buildWhatsAppBookingLink(submittedData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 flex-1 px-5 py-3.5 text-sm font-semibold text-white bg-[#E03E24] hover:bg-[#C8321B] rounded-md transition-colors min-h-[44px]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Directly via WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedData(null)}
                      className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-medium text-zinc-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 rounded-md transition-colors min-h-[44px]"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="booking-fullName"
                        className="block text-xs font-medium text-zinc-300 mb-2"
                      >
                        Full Name <span className="text-[#E03E24]">*</span>
                      </label>
                      <input
                        id="booking-fullName"
                        type="text"
                        required
                        placeholder="e.g. Rahul Krishnan"
                        value={form.fullName}
                        onChange={(e) => {
                          setForm({ ...form, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        className="w-full px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 bg-[#0A0A0D] border border-white/15 rounded-md focus:border-[#E03E24] focus:outline-none transition-colors min-h-[44px]"
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs font-medium text-zinc-300 mb-2"
                      >
                        Phone / WhatsApp Number <span className="text-[#E03E24]">*</span>
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={form.phone}
                        onChange={(e) => {
                          setForm({ ...form, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        className="w-full px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 bg-[#0A0A0D] border border-white/15 rounded-md focus:border-[#E03E24] focus:outline-none transition-colors min-h-[44px]"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="booking-email"
                      className="block text-xs font-medium text-zinc-300 mb-2"
                    >
                      Email Address <span className="text-[#E03E24]">*</span>
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className="w-full px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 bg-[#0A0A0D] border border-white/15 rounded-md focus:border-[#E03E24] focus:outline-none transition-colors min-h-[44px]"
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Tattoo Idea & Approximate Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="booking-idea"
                        className="block text-xs font-medium text-zinc-300 mb-2"
                      >
                        Tattoo Idea / Piercing Type <span className="text-[#E03E24]">*</span>
                      </label>
                      <textarea
                        id="booking-idea"
                        rows={3}
                        required
                        placeholder="Describe your tattoo design, lettering, style, or piercing..."
                        value={form.tattooIdea}
                        onChange={(e) => {
                          setForm({ ...form, tattooIdea: e.target.value });
                          if (errors.tattooIdea) setErrors({ ...errors, tattooIdea: undefined });
                        }}
                        className="w-full px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 bg-[#0A0A0D] border border-white/15 rounded-md focus:border-[#E03E24] focus:outline-none transition-colors resize-none"
                      />
                      {errors.tattooIdea && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.tattooIdea}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-size"
                        className="block text-xs font-medium text-zinc-300 mb-2"
                      >
                        Approx. Size (in / cm)
                      </label>
                      <input
                        id="booking-size"
                        type="text"
                        placeholder="e.g. 4 x 6 inches"
                        value={form.tattooSize}
                        onChange={(e) => setForm({ ...form, tattooSize: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 bg-[#0A0A0D] border border-white/15 rounded-md focus:border-[#E03E24] focus:outline-none transition-colors min-h-[44px]"
                      />
                      <p className="mt-1.5 text-[11px] text-zinc-500 leading-snug">
                        Rough height &amp; width helps us estimate session duration.
                      </p>
                    </div>
                  </div>

                  {/* Placement & Preferred Artist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="booking-placement"
                        className="block text-xs font-medium text-zinc-300 mb-2"
                      >
                        Body Placement <span className="text-[#E03E24]">*</span>
                      </label>
                      <select
                        id="booking-placement"
                        required
                        value={form.placement}
                        onChange={(e) => {
                          setForm({ ...form, placement: e.target.value });
                          if (errors.placement) setErrors({ ...errors, placement: undefined });
                        }}
                        className="w-full px-3.5 py-2.5 text-sm text-white bg-[#0A0A0D] border border-white/15 rounded-md focus:border-[#E03E24] focus:outline-none transition-colors min-h-[44px]"
                      >
                        <option value="" disabled>
                          Select placement
                        </option>
                        {PLACEMENT_OPTIONS.map((place) => (
                          <option key={place} value={place}>
                            {place}
                          </option>
                        ))}
                        {form.placement && !PLACEMENT_OPTIONS.includes(form.placement) && (
                          <option value={form.placement}>{form.placement}</option>
                        )}
                      </select>
                      {errors.placement && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.placement}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-artist"
                        className="block text-xs font-medium text-zinc-300 mb-2"
                      >
                        Preferred Artist / Specialty
                      </label>
                      <select
                        id="booking-artist"
                        value={form.preferredArtist}
                        onChange={(e) => setForm({ ...form, preferredArtist: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm text-white bg-[#0A0A0D] border border-white/15 rounded-md focus:border-[#E03E24] focus:outline-none transition-colors min-h-[44px]"
                      >
                        {STUDIO_CONFIG.bookingSpecialists.map((specialist) => (
                          <option key={specialist} value={specialist}>
                            {specialist}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Reference Image Upload */}
                  <div>
                    <span className="block text-xs font-medium text-zinc-300 mb-2">
                      Reference Image Upload (Optional)
                    </span>

                    {referencePreview && referenceFile ? (
                      <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-[#0A0A0D] border border-white/15">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={referencePreview}
                            alt="Uploaded tattoo reference preview"
                            className="w-14 h-14 object-cover rounded-md border border-white/10 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {referenceFile.name}
                            </p>
                            <p className="font-mono-tabular text-xs text-zinc-400">
                              {(referenceFile.size / 1024).toFixed(0)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeReferenceImage}
                          aria-label="Remove reference image"
                          className="inline-flex items-center justify-center w-10 h-10 rounded-md text-zinc-400 hover:text-red-400 hover:bg-white/[0.05] transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="booking-reference"
                        className="flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-lg bg-[#0A0A0D] border border-dashed border-white/20 hover:border-[#E03E24]/70 cursor-pointer transition-colors text-center"
                      >
                        <Upload className="w-5 h-5 text-zinc-400" />
                        <span className="text-sm text-zinc-300 font-medium">
                          Click to upload a reference sketch or photo
                        </span>
                        <span className="text-xs text-zinc-500">
                          PNG, JPG, or WEBP up to 10 MB
                        </span>
                        <input
                          id="booking-reference"
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                    )}

                    {fileError && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{fileError}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#E03E24] hover:bg-[#C8321B] rounded-md transition-colors min-h-[48px]"
                    >
                      Request Consultation
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
