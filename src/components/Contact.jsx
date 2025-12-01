import React, { useState, useRef } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Loader2, Send } from 'lucide-react';
// import emailjs from '@emailjs/browser'; // Uncomment when ready to use

const Contact = ({ personalInfo }) => {
  const form = useRef();
  const [status, setStatus] = useState('idle');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate email send
    setTimeout(() => { setStatus('success'); form.current.reset(); setTimeout(() => setStatus('idle'), 3000); }, 1500);
  };

  const ContactLink = ({ href, icon, text }) => (
    <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-400 hover:text-white group transition-colors p-4 bg-white/5 rounded-xl border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.08] backdrop-blur-sm">
      <div className="text-cyan-500 group-hover:scale-110 transition-transform">{icon}</div><span className="font-medium">{text}</span>
    </a>
  );

  return (
    <section id="contact" className="py-24 px-6 border-t border-white/5 bg-[#030303] relative z-10">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-bold mb-8">Let's <span className="text-cyan-500">Connect.</span></h2>
          <p className="text-slate-400 mb-8 text-lg">Currently looking for new opportunities.</p>
          <div className="space-y-6">
            <ContactLink href={`mailto:${personalInfo.email}`} icon={<Mail />} text={personalInfo.email} />
            <ContactLink href={`tel:${personalInfo.phone}`} icon={<Phone />} text={personalInfo.phone} />
            <ContactLink href={personalInfo.linkedin} icon={<Linkedin />} text="LinkedIn" />
            <ContactLink href={personalInfo.github} icon={<Github />} text="GitHub" />
            <div className="flex items-center gap-4 text-slate-400 p-4 bg-white/5 rounded-xl border border-white/5">
              <MapPin className="text-cyan-500" /> <span>{personalInfo.location}</span>
            </div>
          </div>
        </div>
        
        {/* FORM */}
        <div className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl shadow-xl backdrop-blur-md">
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div><label className="block text-slate-400 mb-2 text-sm font-medium">Name</label><input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none transition-all" required placeholder="Your Name" /></div>
            <div><label className="block text-slate-400 mb-2 text-sm font-medium">Email</label><input type="email" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none transition-all" required placeholder="john@example.com" /></div>
            <div><label className="block text-slate-400 mb-2 text-sm font-medium">Message</label><textarea rows="4" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none transition-all" required placeholder="Hello Antariksh..."></textarea></div>
            <button type="submit" disabled={status === 'loading'} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition-all flex justify-center items-center gap-2 disabled:opacity-70">{status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> Send Message</>}</button>
            {status === 'success' && <p className="text-green-400 text-sm text-center animate-pulse">Message sent successfully!</p>}
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