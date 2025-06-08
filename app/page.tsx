"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FaBrain, FaVideo, FaForward, FaTags, FaUsers, FaChartBar, FaLock, FaPython, FaDocker, FaReact, FaBars, FaTimes, FaSun, FaMoon, FaShieldAlt, FaCloud, FaServer } from "react-icons/fa";
import { SiNestjs, SiOpencv, SiRedis, SiNextdotjs } from "react-icons/si";
import { useState, useEffect, useRef } from "react";
import "keen-slider/keen-slider.min.css";
import { KeenSliderPlugin, useKeenSlider } from "keen-slider/react";

const features = [
  {
    icon: <FaBrain className="text-3xl text-blue-400" />, 
    title: "AI That Actually Works", 
    desc: "YOLO detection meets human precision. Our AI + Human QA Loop means fewer mistakes, faster turnarounds, and datasets that actually train better models."
  },
  {
    icon: <FaVideo className="text-3xl text-blue-400" />, 
    title: "Handle Any Video, Any Size", 
    desc: "Drop 10-hour surveillance footage or terabytes of dashcam data. FrameFlow scales from single clips to enterprise-grade annotation pipelines."
  },
  {
    icon: <FaForward className="text-3xl text-blue-400" />, 
    title: "Smart Frame Inheritance", 
    desc: "Annotate once, inherit everywhere. Our intelligent frame-to-frame propagation cuts annotation time by 70%+ while maintaining accuracy."
  },
  {
    icon: <FaTags className="text-3xl text-blue-400" />, 
    title: "Deep Object Intelligence", 
    desc: "Beyond bounding boxes. Tag license plates, facial expressions, clothing details, vehicle types—anything your model needs to learn."
  },
];

const adminFeatures = [
  {
    icon: <FaUsers className="text-2xl text-blue-400" />, 
    title: "Team Orchestration", 
    desc: "Auto-distribute workloads, track annotator performance, and manage quality control across distributed teams with military-grade precision."
  },
  {
    icon: <FaChartBar className="text-2xl text-blue-400" />, 
    title: "Performance Analytics", 
    desc: "Real-time dashboards showing throughput, accuracy metrics, and bottlenecks. Know exactly where your annotation pipeline stands."
  },
  {
    icon: <FaLock className="text-2xl text-blue-400" />, 
    title: "Enterprise Security", 
    desc: "Air-gapped deployments, SOC2 compliance, and on-premises options. Your sensitive data never leaves your infrastructure."
  },
];

const techStack = [
  { icon: <FaPython className="text-3xl text-[#3776AB]" />, name: "Python" },
  { icon: <SiNestjs className="text-3xl text-[#E0234E]" />, name: "NestJS" },
  { icon: <SiNextdotjs className="text-3xl text-white" />, name: "Next.js" },
  { icon: <SiOpencv className="text-3xl text-[#5C3EE8]" />, name: "OpenCV" },
  { icon: <SiRedis className="text-3xl text-[#DC382D]" />, name: "Redis" },
  { icon: <FaDocker className="text-3xl text-[#2496ED]" />, name: "Docker" },
  { icon: <FaReact className="text-3xl text-[#61DAFB]" />, name: "WebSockets" },
];

const useCases = [
  "Autonomous vehicle training pipelines",
  "Smart city surveillance networks",
  "Defense & security applications",
  "Medical imaging & diagnostics",
  "Industrial quality control systems",
];

const targetIndustries = [
  { 
    name: "Autonomous Vehicles", 
    icon: "🚗",
    description: "Training data for self-driving systems"
  },
  { 
    name: "Smart Cities", 
    icon: "🏙️",
    description: "Surveillance and traffic analysis"
  },
  { 
    name: "AI Research", 
    icon: "🧠",
    description: "Computer vision model development"
  },
  { 
    name: "Defense & Security", 
    icon: "🛡️",
    description: "Mission-critical applications"
  },
  { 
    name: "Medical Imaging", 
    icon: "⚕️",
    description: "Diagnostic and treatment datasets"
  },
  { 
    name: "Industrial QC", 
    icon: "🏭",
    description: "Quality control automation"
  },
];

const pricingPlans = [
  {
    name: "Startup",
    price: "Custom",
    desc: "Perfect for MVPs and proof-of-concepts",
    features: [
      "Up to 5 annotators",
      "Core AI detection models",
      "Standard video formats",
      "Community support",
      "Cloud deployment"
    ],
    cta: "Start Free Trial"
  },
  {
    name: "Scale",
    price: "Custom",
    desc: "Built for growing teams with serious data needs",
    features: [
      "Up to 50 annotators",
      "Advanced AI + QA workflows",
      "All video formats + APIs",
      "Priority support",
      "Hybrid cloud deployment",
      "Custom model training"
    ],
    cta: "Talk to Sales",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Maximum security and scale for critical applications",
    features: [
      "Unlimited annotators",
      "Air-gapped installations",
      "On-premises deployment",
      "24/7 dedicated support",
      "Custom AI architectures",
      "Advanced analytics suite",
      "SOC2 + compliance ready"
    ],
    cta: "Contact Us"
  }
];

const screenshots = [
  {
    src: "/image.png",
    alt: "FrameFlow Annotation Interface - Privacy-first video annotation with AI-powered object detection and bounding boxes",
  },
];

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 9}px, ${e.clientY - 9}px, 0)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${e.clientX - 18}px, ${e.clientY - 18}px, 0)`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <div ref={trailRef} className="custom-cursor-trail" />
      <div ref={cursorRef} className="custom-cursor" />
    </>
  );
}

function AnimatedCounter({ value, label, isDarkMode }: { value: string; label: string; isDarkMode: boolean }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    if (isNaN(numericValue)) return;

    let start = 0;
    const duration = 2000;
    const increment = numericValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const formatValue = (num: number) => {
    if (value.includes('M+')) return `${num}M+`;
    if (value.includes('%')) return `${num}%`;
    if (value.includes('+')) return `${num}+`;
    if (value.includes('/')) return value;
    return num.toString();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
        {isVisible ? formatValue(count) : value}
      </div>
      <div className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
        {label}
      </div>
    </motion.div>
  );
}

function ContactForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    useCase: "",
    companySize: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage('🎉 Success! Check your email for demo access credentials.');
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setSubmitMessage(`❌ ${result.error || 'Something went wrong. Please try again.'}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('❌ Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Get Started with FrameFlow</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Work Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
              placeholder="john@company.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
              placeholder="Acme Corp"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Company Size
            </label>
            <select
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="">Select size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201+">201+ employees</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Primary Use Case
            </label>
            <select
              name="useCase"
              value={formData.useCase}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
            >
              <option value="">Select use case</option>
              <option value="surveillance">Smart City & Surveillance</option>
              <option value="autonomous">Autonomous Vehicle Training</option>
              <option value="research">AI/ML Research</option>
              <option value="security">Security & Monitoring</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Additional Details
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-400 resize-none"
              placeholder="Tell us about your annotation needs..."
            />
          </div>
          
          {submitMessage && (
            <div className={`p-4 rounded-lg text-center mb-4 ${
              submitMessage.includes('Success') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {submitMessage}
            </div>
          )}
          
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Request Demo & Pricing'}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    loop: true,
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Demo", href: "#screenshots" },
    { name: "Pricing", href: "#pricing" },
    { name: "Use Cases", href: "#use-cases" },
    { name: "Contact", href: "#contact" },
  ];

  const themeClasses = isDarkMode 
    ? "min-h-screen bg-[#10121a] text-white font-sans" 
    : "min-h-screen bg-gray-50 text-gray-900 font-sans";

  return (
    <div className={themeClasses}>
      <CustomCursor />
      {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
      
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-slate-900/80' : 'bg-white/80'} backdrop-blur-md border-b ${isDarkMode ? 'border-blue-800/30' : 'border-gray-200'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="flex items-center space-x-4"
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="FrameFlow Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                FrameFlow
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className={`${isDarkMode ? 'text-slate-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-300 font-medium`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              
              {/* Theme Toggle */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${isDarkMode ? 'text-slate-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
              >
                {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0"
                  onClick={() => setShowContactForm(true)}
                >
                  Get Started
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className={`p-2 ${isDarkMode ? 'text-slate-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
              >
                {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`${isDarkMode ? 'text-slate-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
              >
                {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={false}
            animate={{ height: mobileMenuOpen ? "auto" : 0, opacity: mobileMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden ${isDarkMode ? 'bg-slate-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-lg mt-2`}
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block ${isDarkMode ? 'text-slate-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-300 py-2`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0 mt-4"
                onClick={() => {
                  setShowContactForm(true);
                  setMobileMenuOpen(false);
                }}
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-16 px-4 text-center overflow-hidden" aria-label="Hero section with main value proposition">

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
          className="mb-8"
        >
          <div className="w-48 h-48 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="FrameFlow Logo"
              width={192}
              height={192}
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight"
        >
          Turn Raw Video Into 
          <br />
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            Training Gold
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={`max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl mb-12 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'} leading-relaxed`}
        >
          The annotation platform that actually scales. Cut labeling time by 70% with AI-human workflows that enterprise teams trust for mission-critical datasets.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
                          <Button 
                size="lg" 
                className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0 shadow-2xl" 
                onClick={() => setShowContactForm(true)}
              >
                Get Live Demo
              </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
                          <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-lg font-semibold border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white" 
                asChild
              >
                <a href="#screenshots">See It Work</a>
              </Button>
          </motion.div>
        </motion.div>

        {/* Deployment Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-slate-800/50 border border-blue-800/30' : 'bg-white/80 border border-gray-200'}`}>
            <FaCloud className="text-blue-400" />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>Cloud SaaS</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-slate-800/50 border border-blue-800/30' : 'bg-white/80 border border-gray-200'}`}>
            <FaServer className="text-blue-400" />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>On-Premises</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-slate-800/50 border border-blue-800/30' : 'bg-white/80 border border-gray-200'}`}>
            <FaShieldAlt className="text-blue-400" />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>Air-Gapped</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-blue-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Target Industries Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8" aria-label="Target industries and use cases">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Built for Industries Shaping the Future
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Precision annotation platform designed for mission-critical computer vision applications
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {targetIndustries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className={`text-center p-6 rounded-xl ${isDarkMode ? 'bg-slate-800/30 border border-blue-800/30 hover:bg-slate-800/50' : 'bg-white border border-gray-200 hover:shadow-lg'} transition-all duration-300 group cursor-pointer`}
            >
              <div className="text-4xl mb-3">
                {industry.icon}
              </div>
              <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors mb-2`}>
                {industry.name}
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'} leading-relaxed`}>
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8" id="features" aria-label="Key features and benefits">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Why Teams Choose FrameFlow
          </h2>
          <p className={`text-lg sm:text-xl ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Built by ML engineers who got tired of slow, expensive annotation tools
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className={`h-full ${isDarkMode ? 'bg-slate-800/50 border-blue-800/30 hover:bg-slate-800/70 hover:shadow-blue-500/10' : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-lg'} backdrop-blur-sm transition-all duration-300 hover:border-blue-600/50 hover:shadow-xl`}>
                <CardHeader className="pb-3">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mb-3"
                  >
                    {f.icon}
                  </motion.div>
                  <CardTitle className={`text-xl font-bold ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>
                    {f.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} leading-relaxed`}>
                  {f.desc}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8" id="pricing" aria-label="Pricing plans and options">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Start Small, Scale Massive
          </h2>
          <p className={`text-lg sm:text-xl ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            From startup MVPs to enterprise-grade deployments that handle classified data
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <Card className={`h-full ${isDarkMode ? 'bg-slate-800/50 border-blue-800/30 hover:bg-slate-800/70' : 'bg-white border-gray-200 hover:shadow-lg'} ${plan.popular ? 'border-blue-500 ring-2 ring-blue-500/20' : ''} backdrop-blur-sm transition-all duration-300 hover:border-blue-600/50 hover:shadow-xl`}>
                <CardHeader className="pb-6">
                  <CardTitle className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} ml-2`}>
                      pricing
                    </span>
                  </div>
                  <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} leading-relaxed`}>
                    {plan.desc}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className={`flex items-center gap-3 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.div 
                    className="pt-6"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600' : 'bg-slate-700 hover:bg-slate-600'} border-0`}
                      onClick={() => setShowContactForm(true)}
                    >
                      {plan.cta}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="max-w-6xl mx-auto py-24 px-4 sm:px-6 lg:px-8" id="screenshots">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            See the Magic Happen
          </h2>
          <p className={`text-lg sm:text-xl ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Watch how FrameFlow turns hours of manual work into minutes of smart automation
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className={`keen-slider rounded-2xl overflow-hidden shadow-2xl border ${isDarkMode ? 'border-blue-800/30' : 'border-gray-200'}`}>
            <div ref={sliderRef} className={`keen-slider h-[300px] sm:h-[400px] lg:h-[500px] ${isDarkMode ? 'bg-slate-800/30' : 'bg-gray-100'}`}>
              {screenshots.map((img, idx) => (
                <div className="keen-slider__slide flex items-center justify-center p-4" key={img.alt}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative w-full h-full"
        >
          <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-contain rounded-xl"
                      priority={idx === 0}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {screenshots.length > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              {screenshots.map((_, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === idx 
                      ? "bg-blue-400 shadow-lg shadow-blue-400/50" 
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* Admin & Collaboration */}
      <section className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Enterprise-Grade Management
          </h2>
          <p className={`text-lg sm:text-xl ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            The control and visibility your ops team needs to deliver at scale
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {adminFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className={`h-full ${isDarkMode ? 'bg-slate-800/50 border-blue-800/30 hover:bg-slate-800/70 hover:shadow-blue-500/10' : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-lg'} backdrop-blur-sm transition-all duration-300 hover:border-blue-600/50 hover:shadow-xl`}>
                <CardHeader className="pb-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mb-3"
                  >
                    {f.icon}
                  </motion.div>
                  <CardTitle className={`text-xl font-bold ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>
                    {f.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} leading-relaxed`}>
                  {f.desc}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-6xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Built on Battle-Tested Tech
          </h2>
          <p className={`text-lg sm:text-xl ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            No experimental frameworks. Just proven technologies that handle enterprise workloads.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-wrap justify-center gap-8 lg:gap-12 mb-12"
        >
          {techStack.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`p-4 ${isDarkMode ? 'bg-slate-800/50 border-blue-800/30' : 'bg-white border-gray-200'} rounded-2xl border group-hover:border-blue-600/50 transition-all duration-300`}
              >
                {t.icon}
              </motion.div>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-400 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'} transition-colors`}>
                {t.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Use Cases */}
      <section className="max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8" id="use-cases">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Where FrameFlow Shines
          </h2>
          <p className={`text-lg sm:text-xl ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Real applications where precision matters and mistakes cost millions
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, x: 10 }}
              className={`flex items-center gap-4 ${isDarkMode ? 'bg-slate-800/30 border-blue-800/30 hover:bg-slate-800/50' : 'bg-white border-gray-200 hover:bg-gray-50'} backdrop-blur-sm rounded-xl px-6 py-4 border hover:border-blue-600/50 transition-all duration-300 group cursor-pointer`}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.4 }}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex-shrink-0"
              />
              <span className={`text-lg ${isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'} transition-colors font-medium`}>
                {uc}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-6xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Platform Capabilities
          </h2>
          <p className={`text-lg sm:text-xl ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Built for scale, precision, and enterprise-grade reliability
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter value="70%" label="Time Reduction" isDarkMode={isDarkMode} />
          <AnimatedCounter value="10+" label="Video Formats" isDarkMode={isDarkMode} />
          <AnimatedCounter value="99%" label="Platform Uptime" isDarkMode={isDarkMode} />
          <AnimatedCounter value="24/7" label="Available" isDarkMode={isDarkMode} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden" id="contact">
        {/* Background */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-radial from-blue-500/20 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Stop Burning Money on Bad Data
          </h2>
          <p className={`text-xl sm:text-2xl mb-4 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} leading-relaxed`}>
            Join the teams cutting annotation costs by 70% while improving model accuracy.
          </p>
          <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} mb-12`}>
            <button 
              onClick={() => setShowContactForm(true)}
              className="text-cyan-400 hover:text-cyan-300 transition-colors underline font-semibold"
            >
              See live demo + get custom pricing →
            </button>
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0 shadow-2xl hover:shadow-blue-500/25" 
                onClick={() => setShowContactForm(true)}
              >
                Get Started Now
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="px-12 py-6 text-xl font-bold border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900" 
                asChild
              >
                <a href="/FrameFlow_Pitch_Styled.pdf" download>
                  Download Pitch
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <footer className={`py-20 mt-24 text-center ${isDarkMode ? 'text-slate-500 border-t border-blue-800/30' : 'text-gray-500 border-t border-gray-200'}`}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          &copy; {new Date().getFullYear()} FrameFlow. All rights reserved.
        </motion.p>
      </footer>
    </div>
  );
}
