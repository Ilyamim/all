import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';

const sections = [
  {
    title: 'How it works',
    body: 'Sign up, choose causes, and check in with QR-based attendance to track verified hours.',
  },
  {
    title: 'Features',
    body: 'Role-based dashboards, real-time attendance approvals, and printable certificates.',
  },
  {
    title: 'Impact',
    body: 'Highlight volunteer growth with transparent metrics and curated badge milestones.',
  },
];

const testimonials = [
  {
    quote: '“BrightPath keeps our volunteer crew energized and aligned.”',
    name: 'Community Lead',
  },
  {
    quote: '“The check-in flow is seamless and feels premium.”',
    name: 'Nonprofit Director',
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const Landing: React.FC = () => {
  const { user } = useAuth();
  const reduced = useReducedMotion();

  return (
    <div className="bg-bg">
      <section className="relative overflow-hidden px-6 pb-24 pt-16 md:px-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-muted">
              Premium volunteer operations
            </span>
            <h1 className="text-4xl font-semibold font-display text-ink md:text-5xl">
              BrightPath Volunteer helps every hour shine.
            </h1>
            <p className="text-lg text-muted">
              A retro-modern platform for volunteers, organizers, and admins to coordinate events, verify
              hours, and celebrate impact with calm clarity.
            </p>
            <div className="flex flex-wrap gap-3">
              {user ? (
                <Link to="/dashboard/volunteer">
                  <Button>Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button>Get Started</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="secondary">Login</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <Card className="flex flex-col justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold">Volunteer pulse</h2>
              <p className="text-sm text-muted">Weekly momentum across all active chapters.</p>
            </div>
            <div className="space-y-4">
              {['Verified hours', 'Active events', 'Badges earned'].map((label, index) => (
                <div key={label} className="flex items-center justify-between rounded-xl bg-secondary/40 px-4 py-3">
                  <span className="text-sm text-muted">{label}</span>
                  <span className="text-lg font-semibold text-ink">{[1240, 38, 92][index]}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6 pb-24 md:px-16">
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 0.4, delay: index * 0.1 }}
            >
              <Card>
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <p className="mt-3 text-sm text-muted">{section.body}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-card px-6 py-20 md:px-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold font-display">Warm, modern, and built for growth.</h2>
            <p className="mt-4 text-muted">
              BrightPath pairs crisp workflows with retro warmth, so volunteers feel recognized and organizers stay
              in control.
            </p>
            <div className="mt-6 flex gap-3">
              <Button>Schedule a demo</Button>
              <Button variant="ghost">View impact</Button>
            </div>
          </div>
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <p className="text-sm text-muted">{testimonial.quote}</p>
                <p className="mt-3 text-xs font-semibold text-ink">{testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-semibold font-display">Ready to power your volunteer community?</h2>
          <p className="text-muted">
            Launch BrightPath in minutes with Firebase authentication, role-based dashboards, and a premium experience.
          </p>
          <Link to="/register">
            <Button>Start BrightPath</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
