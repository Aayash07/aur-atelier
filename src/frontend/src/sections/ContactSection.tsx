import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Clock,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = "Required";
  if (!data.lastName.trim()) errors.lastName = "Required";
  if (!data.email.trim()) errors.email = "Required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address";
  if (!data.subject.trim()) errors.subject = "Required";
  if (!data.message.trim()) errors.message = "Required";
  return errors;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);
  const infoColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [status, setStatus] = useState<FormStatus>("idle");

  // Scroll-triggered entrance animations
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );

      tl.fromTo(
        formColRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" },
        "-=0.3",
      ).fromTo(
        infoColRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" },
        "<",
      );
    },
    { scope: sectionRef },
  );

  const handleBtnMouseEnter = () => {
    if (status === "loading" || status === "success") return;
    gsap.to(submitBtnRef.current, {
      scale: 1.02,
      backgroundColor: "oklch(0.82 0.1 60)",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleBtnMouseLeave = () => {
    if (status === "loading" || status === "success") return;
    gsap.to(submitBtnRef.current, {
      scale: 1,
      backgroundColor: "oklch(0.25 0.05 260)",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormData]) {
      const updated = { ...formData, [name]: value };
      const newErrors = validateForm(updated);
      setErrors((prev) => ({
        ...prev,
        [name]: newErrors[name as keyof FormErrors],
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validateForm(formData);
    setErrors((prev) => ({
      ...prev,
      [name]: newErrors[name as keyof FormErrors],
    }));
  };

  const shakeForm = () => {
    gsap.to(formRef.current, {
      keyframes: [
        { x: 10, duration: 0.07 },
        { x: -10, duration: 0.07 },
        { x: 8, duration: 0.07 },
        { x: -8, duration: 0.07 },
        { x: 0, duration: 0.07 },
      ],
      ease: "none",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched: Partial<Record<keyof FormData, boolean>> = {
      firstName: true,
      lastName: true,
      email: true,
      subject: true,
      message: true,
    };
    setTouched(allTouched);
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      shakeForm();
      return;
    }

    setStatus("loading");
    await new Promise((res) => setTimeout(res, 1500));
    setStatus("success");
  };

  const inputBase =
    "w-full bg-transparent border-b py-3 text-sm font-body outline-none transition-colors duration-200 placeholder:text-[oklch(0.68_0.02_260)]";
  const inputColor = (field: keyof FormData) =>
    errors[field] && touched[field]
      ? `${inputBase} border-[oklch(0.55_0.22_25)] focus:border-[oklch(0.55_0.22_25)]`
      : `${inputBase} border-[oklch(0.85_0.02_80)] focus:border-[oklch(0.62_0.1_60)]`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      data-ocid="contact.section"
      className="py-32 overflow-hidden"
      style={{ backgroundColor: "oklch(0.97 0.02 60)" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center mb-20"
          style={{ opacity: 0 }}
        >
          <p
            className="text-label-caps mb-4"
            data-ocid="contact.eyebrow"
            style={{ color: "oklch(0.62 0.1 60)" }}
          >
            Get in Touch
          </p>
          <h2
            className="text-display-lg"
            data-ocid="contact.headline"
            style={{ color: "oklch(0.25 0.05 260)" }}
          >
            Let&rsquo;s Create Something{" "}
            <em style={{ color: "oklch(0.52 0.1 55)", fontStyle: "italic" }}>
              Beautiful
            </em>{" "}
            Together
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-24 items-start">
          {/* Left — Contact Form */}
          <div ref={formColRef} style={{ opacity: 0 }}>
            {status === "success" ? (
              <div
                data-ocid="contact.success_state"
                className="flex flex-col items-center justify-center py-24 text-center gap-6"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center"
                  style={{
                    backgroundColor: "oklch(0.82 0.1 60 / 0.15)",
                    border: "1px solid oklch(0.82 0.1 60)",
                  }}
                >
                  <Send
                    size={20}
                    strokeWidth={1.5}
                    style={{ color: "oklch(0.52 0.1 55)" }}
                  />
                </div>
                <div>
                  <p
                    className="text-display-md mb-2"
                    style={{ color: "oklch(0.25 0.05 260)" }}
                  >
                    Message Sent
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.5 0.02 260)" }}
                  >
                    We&rsquo;ll be in touch soon.
                  </p>
                </div>
                <button
                  data-ocid="contact.secondary_button"
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                    setTouched({});
                    setErrors({});
                  }}
                  className="text-xs text-label-caps underline underline-offset-4 transition-opacity duration-200 hover:opacity-50"
                  style={{ color: "oklch(0.62 0.1 60)" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                data-ocid="contact.form"
                className="flex flex-col gap-7"
              >
                {/* First + Last name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="text-label-caps mb-2 block"
                      style={{ color: "oklch(0.5 0.02 260)" }}
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      data-ocid="contact.input"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Isabelle"
                      className={inputColor("firstName")}
                      style={{ color: "oklch(0.25 0.05 260)" }}
                    />
                    {errors.firstName && touched.firstName && (
                      <p
                        data-ocid="contact.field_error"
                        className="text-xs mt-1"
                        style={{ color: "oklch(0.55 0.22 25)" }}
                      >
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="text-label-caps mb-2 block"
                      style={{ color: "oklch(0.5 0.02 260)" }}
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      data-ocid="contact.input"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Dupont"
                      className={inputColor("lastName")}
                      style={{ color: "oklch(0.25 0.05 260)" }}
                    />
                    {errors.lastName && touched.lastName && (
                      <p
                        data-ocid="contact.field_error"
                        className="text-xs mt-1"
                        style={{ color: "oklch(0.55 0.22 25)" }}
                      >
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-label-caps mb-2 block"
                    style={{ color: "oklch(0.5 0.02 260)" }}
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    data-ocid="contact.input"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="isabelle@example.com"
                    className={inputColor("email")}
                    style={{ color: "oklch(0.25 0.05 260)" }}
                  />
                  {errors.email && touched.email && (
                    <p
                      data-ocid="contact.field_error"
                      className="text-xs mt-1"
                      style={{ color: "oklch(0.55 0.22 25)" }}
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="text-label-caps mb-2 block"
                    style={{ color: "oklch(0.5 0.02 260)" }}
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    data-ocid="contact.input"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Bespoke commission enquiry"
                    className={inputColor("subject")}
                    style={{ color: "oklch(0.25 0.05 260)" }}
                  />
                  {errors.subject && touched.subject && (
                    <p
                      data-ocid="contact.field_error"
                      className="text-xs mt-1"
                      style={{ color: "oklch(0.55 0.22 25)" }}
                    >
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="text-label-caps mb-2 block"
                    style={{ color: "oklch(0.5 0.02 260)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    data-ocid="contact.textarea"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell us about your project, occasion, or inquiry…"
                    className={`${inputColor("message")} resize-none leading-relaxed`}
                    style={{ color: "oklch(0.25 0.05 260)" }}
                  />
                  {errors.message && touched.message && (
                    <p
                      data-ocid="contact.field_error"
                      className="text-xs mt-1"
                      style={{ color: "oklch(0.55 0.22 25)" }}
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-1">
                  <button
                    ref={submitBtnRef}
                    type="submit"
                    data-ocid="contact.submit_button"
                    disabled={status === "loading"}
                    onMouseEnter={handleBtnMouseEnter}
                    onMouseLeave={handleBtnMouseLeave}
                    className="w-full py-4 px-8 flex items-center justify-center gap-3 text-label-caps tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "oklch(0.25 0.05 260)",
                      color: "oklch(0.97 0.02 60)",
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={13} strokeWidth={1.5} />
                        Send Message
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p
                      data-ocid="contact.error_state"
                      className="text-xs text-center mt-3"
                      style={{ color: "oklch(0.55 0.22 25)" }}
                    >
                      Something went wrong. Please try again.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Right — Contact Info */}
          <div
            ref={infoColRef}
            className="flex flex-col gap-8"
            style={{ opacity: 0 }}
          >
            {/* Boutique name */}
            <div>
              <p
                className="font-display text-xl font-light italic mb-6"
                style={{ color: "oklch(0.25 0.05 260)" }}
              >
                Auré Atelier
              </p>

              <ul className="flex flex-col gap-5">
                <li className="flex items-start gap-3">
                  <MapPin
                    size={14}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0"
                    style={{ color: "oklch(0.62 0.1 60)" }}
                  />
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.42 0.03 260)" }}
                  >
                    12 Rue de la Paix
                    <br />
                    75002 Paris, France
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <Phone
                    size={14}
                    strokeWidth={1.5}
                    className="shrink-0"
                    style={{ color: "oklch(0.62 0.1 60)" }}
                  />
                  <a
                    href="tel:+33142600000"
                    data-ocid="contact.link"
                    className="text-sm transition-opacity duration-200 hover:opacity-50"
                    style={{ color: "oklch(0.42 0.03 260)" }}
                  >
                    +33 1 42 60 00 00
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <Mail
                    size={14}
                    strokeWidth={1.5}
                    className="shrink-0"
                    style={{ color: "oklch(0.62 0.1 60)" }}
                  />
                  <a
                    href="mailto:hello@aureatelier.com"
                    data-ocid="contact.link"
                    className="text-sm transition-opacity duration-200 hover:opacity-50"
                    style={{ color: "oklch(0.42 0.03 260)" }}
                  >
                    hello@aureatelier.com
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <Clock
                    size={14}
                    strokeWidth={1.5}
                    className="shrink-0"
                    style={{ color: "oklch(0.62 0.1 60)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "oklch(0.42 0.03 260)" }}
                  >
                    Mon–Sat: 10h–19h
                  </span>
                </li>
              </ul>
            </div>

            {/* Divider */}
            <div
              className="h-px w-full"
              style={{ backgroundColor: "oklch(0.88 0.03 60)" }}
            />

            {/* Social links */}
            <div>
              <p
                className="text-label-caps mb-4"
                style={{ color: "oklch(0.5 0.02 260)" }}
              >
                Follow the Atelier
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.link"
                  aria-label="Instagram"
                  className="w-10 h-10 border flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{
                    borderColor: "oklch(0.82 0.1 60)",
                    color: "oklch(0.25 0.05 260)",
                  }}
                >
                  <Instagram size={14} strokeWidth={1.5} />
                </a>
                <a
                  href="mailto:hello@aureatelier.com"
                  data-ocid="contact.link"
                  aria-label="Send email"
                  className="w-10 h-10 border flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{
                    borderColor: "oklch(0.82 0.1 60)",
                    color: "oklch(0.25 0.05 260)",
                  }}
                >
                  <Mail size={14} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Decorative quote */}
            <blockquote
              className="pl-4 italic font-display font-light text-base leading-relaxed"
              style={{
                borderLeft: "1px solid oklch(0.82 0.1 60)",
                color: "oklch(0.52 0.04 260)",
              }}
            >
              &ldquo;Fashion is the armor to survive the reality of everyday
              life.&rdquo;
              <cite
                className="block text-label-caps mt-2 not-italic"
                style={{ color: "oklch(0.62 0.1 60)" }}
              >
                — Bill Cunningham
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
