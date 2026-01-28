import React, { useState, useRef } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Loader2, Send, Code } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = ({ personalInfo }) => {
  const form = useRef();
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('loading');

    // ---------------------------------------------------------
    // REPLACE THESE VALUES WITH YOUR KEYS FROM EMAILJS DASHBOARD
    // ---------------------------------------------------------
    const SERVICE_ID = 'service_s57w5zg';   // Example: 'service_x8s...'
    const TEMPLATE_ID = 'template_uj83s9e'; // Example: 'template_9v...'
    const PUBLIC_KEY = 'XD7sqRWpHDucsQQCo';   // Example: 'user_K3s...'

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log('Email sent successfully:', result.text);
          setStatus('success');
          form.current.reset();
          
          // Reset button to normal after 3 seconds
          setTimeout(() => setStatus('idle'), 3000);
      }, (error) => {
          console.error('Failed to send email:', error.text);
          alert("Failed to send message. Please check the console for details.");
          setStatus('idle');
      });
  };

  const ContactLink = ({ href, icon, text }) => (
    <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-400 hover:text-white group transition-colors p-4 bg-white/5 rounded-xl border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.08] backdrop-blur-sm">
      <div className="text-cyan-500 group-hover:scale-110 transition-transform">{icon}</div><span className="font-medium truncate">{text}</span>
    </a>
  );

  return (
    <section id="contact" className="py-24 px-6 border-t border-white/5 bg-[#030303] relative z-10">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
        
        {/* LEFT SIDE: Contact Info */}
        <div>
          <h2 className="text-4xl font-bold mb-8">Let's <span className="text-cyan-500">Connect.</span></h2>
          <p className="text-slate-400 mb-8 text-lg">Looking for new opportunities. My inbox is always open!</p>
          <div className="space-y-4">
            <ContactLink href={`mailto:${personalInfo.email}`} icon={<Mail />} text={personalInfo.email} />
            <ContactLink href={`tel:${personalInfo.phone}`} icon={<Phone />} text={personalInfo.phone} />
            <ContactLink href={personalInfo.linkedin} icon={<Linkedin />} text="LinkedIn" />
            <ContactLink href={personalInfo.github} icon={<Github />} text="GitHub" />
            <ContactLink href={personalInfo.leetcode} icon={<Code />} text="LeetCode" />
            <div className="flex items-center gap-4 text-slate-400 p-4 bg-white/5 rounded-xl border border-white/5">
              <MapPin className="text-cyan-500" /> <span>{personalInfo.location}</span>
            </div>
          </div>
        </div>
        
        {/* RIGHT SIDE: Email Form */}
        <div className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl shadow-xl backdrop-blur-md h-fit">
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            
            {/* NAME INPUT */}
            <div>
              <label className="block text-slate-400 mb-2 text-sm font-medium">Name</label>
              <input 
                type="text" 
                name="user_name"  // Matches {{user_name}} in EmailJS template
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none transition-all" 
                required 
                placeholder="Your Name" 
              />
            </div>

            {/* EMAIL INPUT */}
            <div>
              <label className="block text-slate-400 mb-2 text-sm font-medium">Email</label>
              <input 
                type="email" 
                name="user_email" // Matches {{user_email}} in EmailJS template
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none transition-all" 
                required 
                placeholder="john@example.com" 
              />
            </div>

            {/* MESSAGE INPUT */}
            <div>
              <label className="block text-slate-400 mb-2 text-sm font-medium">Message</label>
              <textarea 
                name="message" // Matches {{message}} in EmailJS template
                rows="4" 
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none transition-all" 
                required 
                placeholder="Hello Antariksh..."
              ></textarea>
            </div>

            {/* SUBMIT BUTTON */}
            <button 
              type="submit" 
              disabled={status === 'loading'} 
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>

            {/* SUCCESS MESSAGE */}
            {status === 'success' && (
              <p className="text-green-400 text-sm text-center animate-pulse font-medium mt-2">
                Message sent successfully!
              </p>
            )}
          </form>
        </div>

      </div>
      <div className="mt-24 pt-8 border-t border-white/5 text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} {personalInfo.name}. Built with React & Tailwind.</p>
      </div>
    </section>
  );
};

export default Contact;