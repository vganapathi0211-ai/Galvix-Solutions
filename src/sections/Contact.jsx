import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(7, 'Please include a valid phone number.').optional().or(z.literal('')),
  company: z.string().min(2, 'Company name is required.'),
  service: z.string().min(1, 'Please select a service.'),
  message: z.string().min(20, 'Please provide a few more details about your project.'),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    setSubmitState('idle');

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone || 'Not provided',
          company: values.company,
          service: values.service,
          message: values.message,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        setSubmitState('error');
        return;
      }

      setSubmitState('success');
      reset();
    } catch (error) {
      setSubmitState('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">

        <SectionHeading
          title="Let’s talk about your next move"
          subtitle="Tell us what you need and we’ll help you map the right digital solution."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-16 max-w-6xl mx-auto">
          <motion.div
            className="lg:col-span-2 flex flex-col justify-between"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact information</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We work on strategy, product, and delivery. Share a few details and we’ll get back to you with the right next step.
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-blue-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href="mailto:hello@glsolutions.com" className="font-medium hover:text-white transition-colors">hello@glsolutions.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-blue-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a href="tel:+918489968612" className="font-medium hover:text-white transition-colors">+91 84899 68612</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-blue-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">Remote-first delivery</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button type="button" variant="outline" className="flex items-center justify-center gap-2 border-green-500/30 text-green-400 hover:bg-green-500/10 w-full" onClick={() => window.open('https://wa.me/918489968612', '_blank')}>
                <MessageCircle size={18} /> WhatsApp
              </Button>
              <Button type="button" variant="outline" className="flex items-center justify-center gap-2 border-blue-500/30 text-blue-400 hover:bg-blue-500/10 w-full" onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}>
                <MessageSquare size={18} /> Live Chat
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="!p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm text-gray-400">Your name</label>
                    <input
                      id="name"
                      {...register('name')}
                      className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Jane Smith"
                    />
                    {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm text-gray-400">Email</label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="jane@company.com"
                    />
                    {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm text-gray-400">Phone number</label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="+91 84899 68612"
                    />
                    {errors.phone && <p className="text-sm text-red-400">{errors.phone.message}</p>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="text-sm text-gray-400">Company</label>
                    <input
                      id="company"
                      {...register('company')}
                      className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Your company name"
                    />
                    {errors.company && <p className="text-sm text-red-400">{errors.company.message}</p>}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="text-sm text-gray-400">Service needed</label>
                  <select
                    id="service"
                    {...register('service')}
                    className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-slate-900 text-gray-400">Select a service</option>
                    <option value="Custom Software" className="bg-slate-900">Custom Software</option>
                    <option value="AI & Automation" className="bg-slate-900">AI & Automation</option>
                    <option value="Web Experience Design" className="bg-slate-900">Web Experience Design</option>
                    <option value="Digital Transformation" className="bg-slate-900">Digital Transformation</option>
                    <option value="Product Strategy" className="bg-slate-900">Product Strategy</option>
                  </select>
                  {errors.service && <p className="text-sm text-red-400">{errors.service.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm text-gray-400">Project details</label>
                  <textarea
                    id="message"
                    rows="4"
                    {...register('message')}
                    className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell us about the challenge, timeline, and goals..."
                  />
                  {errors.message && <p className="text-sm text-red-400">{errors.message.message}</p>}
                </div>

                {submitState === 'success' && (
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-300 text-sm">
                    <CheckCircle2 size={18} /> Your inquiry has been submitted successfully.
                  </div>
                )}

                {submitState === 'error' && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300 text-sm">
                    <AlertCircle size={18} /> Something went wrong. Please try again or email us directly.
                  </div>
                )}

                <Button type="submit" variant="primary" size="lg" className="w-full flex items-center justify-center gap-2" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                </Button>
              </form>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
