import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-root">
      {/* Decorative shapes */}
      <div className="shape shape-tl" />
      <div className="shape shape-bl" />
      <div className="shape shape-bm" />

      <div className="contact-wrapper">
        {/* Left — info col */}
        <div className="contact-info">
          <div className="hello-label">
            <span className="hello-line" />
            <span>Get In Touch</span>
          </div>

          <h1 className="contact-title">
            Let's build something <span className="contact-title-accent">useful</span>
          </h1>

          <p className="contact-subtitle">
            Have a project, MVP, or business idea? I'd love to hear about it. Send a message
            and I'll get back to you promptly.
          </p>

          <div className="contact-channels">
            <a href="mailto:hello@example.com" className="contact-channel">
              <span className="contact-channel-icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </span>
              <div>
                <p className="contact-channel-label">Email</p>
                <p className="contact-channel-value">hello@example.com</p>
              </div>
            </a>

            <a href="https://github.com" target="_blank" rel="noreferrer" className="contact-channel">
              <span className="contact-channel-icon">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </span>
              <div>
                <p className="contact-channel-label">GitHub</p>
                <p className="contact-channel-value">github.com/yourhandle</p>
              </div>
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-channel">
              <span className="contact-channel-icon">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </span>
              <div>
                <p className="contact-channel-label">LinkedIn</p>
                <p className="contact-channel-value">linkedin.com/in/yourhandle</p>
              </div>
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div className="contact-form-card">
          {submitted ? (
            <div className="contact-success">
              <div className="contact-success-icon">✓</div>
              <h3 className="contact-success-title">Message sent!</h3>
              <p className="contact-success-body">Thanks for reaching out. I'll get back to you soon.</p>
              <button className="btn-primary" onClick={() => setSubmitted(false)}>Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <p className="about-card-label mb-6">
                <span className="hello-line" /> Send a Message
              </p>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Your name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email address</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry, MVP, collaboration..."
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  className="form-input form-textarea"
                  required
                />
              </div>

              <button type="submit" className="btn-primary form-submit">
                Send Message
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{marginLeft: '0.5rem'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;