'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Send to Formspree (email)
      const emailResponse = await fetch('https://formspree.io/f/xrbpyepe', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Send WhatsApp message via API route
      const whatsappResponse = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          message: data.message
        })
      });

      if (emailResponse.ok && whatsappResponse.ok) {
        toast.success('Message sent! Check WhatsApp for confirmation.', {
          position: 'top-center',
          duration: 5000
        });
        reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error sending message', {
        position: 'top-center',
        duration: 3000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      className="py-24 bg-gradient-to-b from-black/95 to-black/60 backdrop-blur-lg"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          variants={item}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ y: -20 }}
            whileInView={{ y: 0 }}
          >
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Touch</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-300 mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
          />
          <motion.p 
            className="text-lg max-w-2xl mx-auto text-white/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Let's collaborate on something extraordinary
          </motion.p>
        </motion.div>

        <motion.div
          variants={item}
          className="flex justify-center"
        >
          <Card className="bg-gradient-to-b from-gray-900/90 to-black/70 backdrop-blur-sm border border-gray-700/50 hover:border-red-400/30 transition-all duration-500 shadow-2xl shadow-red-900/10 w-full max-w-5xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Contact Info Section */}
              <motion.div
                className="p-10 bg-gradient-to-br from-gray-900/70 to-black/50 relative overflow-hidden"
                variants={container}
              >
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[size:40px_40px] opacity-10"></div>
                <div className="relative z-10">
                  <motion.div variants={item}>
                    <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                    <p className="text-white/70 mb-8">
                      Reach out directly or use the contact form
                    </p>
                  </motion.div>

                  <motion.div 
                    className="space-y-5"
                    variants={container}
                  >
                    {[
                      { 
                        icon: <Mail className="w-5 h-5 text-red-400" />, 
                        title: "Email", 
                        content: "brianokeo455@gmail.com", 
                        href: "mailto:brianokeo455@gmail.com" 
                      },
                      { 
                        icon: <Phone className="w-5 h-5 text-red-400" />, 
                        title: "Phone", 
                        content: "+254 113 644 120", 
                        href: "tel:+254113644120" 
                      },
                      { 
                        icon: <MapPin className="w-5 h-5 text-red-400" />, 
                        title: "Location", 
                        content: "Nairobi, Kenya" 
                      }
                    ].map((contact, index) => (
                      <motion.div
                        key={index}
                        variants={item}
                        className="flex items-center gap-4 p-4 rounded-lg hover:bg-red-900/10 transition-all group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-3 bg-red-900/20 rounded-full group-hover:bg-red-900/30 transition-all">
                          {contact.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-white text-lg">{contact.title}</h4>
                          {contact.href ? (
                            <a href={contact.href} className="text-white/70 hover:text-red-300 transition-colors text-sm">
                              {contact.content}
                            </a>
                          ) : (
                            <span className="text-white/70 text-sm">{contact.content}</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              {/* Form Section */}
              <motion.form
                className="p-10 space-y-6 bg-gradient-to-b from-gray-900/80 to-black/60"
                variants={container}
                onSubmit={handleSubmit(onSubmit)}
              >
                <motion.div variants={item} className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/80">Your Name</label>
                  <Input 
                    id="name"
                    className="bg-gray-900/50 border-gray-700/50 text-white placeholder:text-white/40 focus:border-red-500 h-12 text-base"
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                  )}
                </motion.div>

                <motion.div variants={item} className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80">Your Email</label>
                  <Input 
                    id="email"
                    type="email"
                    className="bg-gray-900/50 border-gray-700/50 text-white placeholder:text-white/40 focus:border-red-500 h-12 text-base"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </motion.div>

                <motion.div variants={item} className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-white/80">WhatsApp Number</label>
                  <Input 
                    id="phone"
                    type="tel"
                    className="bg-gray-900/50 border-gray-700/50 text-white placeholder:text-white/40 focus:border-red-500 h-12 text-base"
                    {...register('phone', { 
                      required: 'WhatsApp number is required',
                      pattern: {
                        value: /^\+?[\d\s-]{10,15}$/,
                        message: 'Please enter a valid phone number with country code'
                      }
                    })}
                    placeholder="+254 123 456 789"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </motion.div>

                <motion.div variants={item} className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white/80">Your Message</label>
                  <Textarea 
                    id="message"
                    className="bg-gray-900/50 border-gray-700/50 text-white placeholder:text-white/40 focus:border-red-500 text-base min-h-[150px]"
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters'
                      }
                    })}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                  )}
                </motion.div>
                
                <motion.div
                  variants={item}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 h-12 gap-2 text-base font-medium shadow-lg shadow-red-900/20"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? (
                      <span className="inline-flex items-center">
                        <span className="animate-pulse">Sending</span>
                        <span className="ml-1 animate-bounce">...</span>
                      </span>
                    ) : 'Send Message'}
                  </Button>
                </motion.div>
              </motion.form>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}