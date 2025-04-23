// src/app/contact/page.tsx

import ContactForm from '../components/ContactSection'; // Using the component created for the main page.
import GlassmorphicCard from '../components/GlassmorphicCard';

export default function ContactPage() {
  return (
    <GlassmorphicCard title="Contact Me">
      <ContactForm />
    </GlassmorphicCard>
  );
}