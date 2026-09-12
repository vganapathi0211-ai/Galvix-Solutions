import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    message: ''
  });
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', company: '', message: '' });
    setRating(0);
    // Hide success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-2xl">
        <SectionHeading 
          title="Client Feedback" 
          subtitle="Completed a project with us? Share your experience."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 bg-surface rounded-xl p-6 md:p-8 shadow-md border border-gray-700/50"
        >
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} className="fill-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
              <p className="text-gray-400">Your review has been submitted.</p>
              <p className="text-gray-500 text-sm mt-4">Reviews will be displayed after verification.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">Company / Role</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="e.g. Founder at TechCorp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className="focus:outline-none"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                    >
                      <Star 
                        size={28} 
                        className={`transition-colors ${
                          star <= (hoveredRating || rating) 
                            ? 'text-amber-400 fill-amber-400' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Review Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                  placeholder="Tell us about your experience..."
                ></textarea>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full justify-center">
                  Submit Review
                </Button>
                <p className="text-center text-xs text-gray-500 mt-4">
                  Reviews will be displayed after verification.
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewForm;
