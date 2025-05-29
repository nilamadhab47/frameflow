"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FaBrain, FaVideo, FaForward, FaTags, FaUsers, FaChartBar, FaLock, FaPython, FaDocker, FaReact, FaBars, FaTimes } from "react-icons/fa";
import { SiNestjs, SiOpencv, SiRedis, SiNextdotjs } from "react-icons/si";
import { useState, useEffect, useRef } from "react";
import "keen-slider/keen-slider.min.css";
import { KeenSliderPlugin, useKeenSlider } from "keen-slider/react";

const features = [
  {
    icon: <FaBrain className="text-3xl text-blue-400" />, title: "AI-Powered Detection", desc: "Auto-detect objects using integrated YOLO, then refine them effortlessly with drag & resize."
  },
  {
    icon: <FaVideo className="text-3xl text-blue-400" />, title: "Full Video Support", desc: "Upload a single video or an entire folder — FrameFlow handles long formats with ease."
  },
  {
    icon: <FaForward className="text-3xl text-blue-400" />, title: "Smart Frame Inheritance", desc: "Annotations intelligently carry over to the next frame. Save time, annotate faster."
  },
  {
    icon: <FaTags className="text-3xl text-blue-400" />, title: "Attribute-Driven Tagging", desc: "Add detailed tags for vehicles, people, or any object — license plates, gender, clothing, accessories, etc."
  },
];

const adminFeatures = [
  {
    icon: <FaUsers className="text-2xl text-blue-400" />, title: "Collaborator Dashboard", desc: "Assign videos or folders to team members automatically based on workload."
  },
  {
    icon: <FaChartBar className="text-2xl text-blue-400" />, title: "Track Performance", desc: "View stats like time per task, boxes drawn, tags added, and user efficiency."
  },
  {
    icon: <FaLock className="text-2xl text-blue-400" />, title: "Scalable & Secure", desc: "Works in team environments with Dockerized deployment and Redis/WebSocket-backed real-time sync."
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
  "Smart city & traffic surveillance",
  "Autonomous vehicle training",
  "AI/ML dataset generation",
  "Security & behavior tracking",
  "Research labs & academic datasets",
];

const screenshots = [
  {
    src: "/WhatsApp Image 2025-05-29 at 01.41.24.jpeg",
    alt: "FrameFlow Annotation Interface - Video annotation with AI-powered object detection and bounding boxes",
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

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    loop: true,
  });

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Demo", href: "#screenshots" },
    { name: "Use Cases", href: "#use-cases" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#10121a] text-white font-sans">
      <CustomCursor />
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-blue-800/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <FaVideo className="text-slate-900 text-lg" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
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
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-300 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0"
                  asChild
                >
                  <a href="mailto:nilamadhab47@gmail.com">Get Started</a>
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-300 hover:text-blue-400 transition-colors"
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
            className="md:hidden overflow-hidden bg-slate-800/95 backdrop-blur-sm rounded-lg mt-2"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-slate-300 hover:text-blue-400 transition-colors duration-300 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0 mt-4"
                asChild
              >
                <a href="mailto:nilamadhab47@gmail.com">Get Started</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-16 px-4 text-center overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-400/20 via-indigo-500/10 to-transparent rounded-full blur-3xl" />
        </motion.div>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl">
            <FaVideo className="text-slate-900 text-4xl" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight"
        >
          Train Better Models with
          <br />
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            Smarter Annotations
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl mb-12 text-slate-300 leading-relaxed"
        >
          FrameFlow is a powerful, AI-assisted video annotation platform that lets teams annotate long videos, tag objects, and accelerate dataset labeling — all in one smooth, scalable interface.
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
            <Button size="lg" className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0 shadow-2xl" asChild>
              <a href="#screenshots">Start Demo</a>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-semibold border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900" asChild>
              <a href="mailto:nilamadhab47@gmail.com">Get in Touch</a>
            </Button>
          </motion.div>
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

      {/* Key Features */}
      <section className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8" id="features">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Key Features
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Powerful tools designed to accelerate your annotation workflow
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
              <Card className="h-full bg-slate-800/50 border-blue-800/30 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:border-blue-600/50 hover:shadow-xl hover:shadow-blue-500/10">
                <CardHeader className="pb-3">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mb-3"
                  >
                    {f.icon}
                  </motion.div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {f.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-400 leading-relaxed">
                  {f.desc}
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
            See FrameFlow in Action
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Experience the power of AI-assisted video annotation
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="keen-slider rounded-2xl overflow-hidden shadow-2xl border border-blue-800/30">
            <div ref={sliderRef} className="keen-slider h-[300px] sm:h-[400px] lg:h-[500px] bg-slate-800/30">
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
            Admin & Collaboration
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Built for teams, designed for scalability
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
              <Card className="h-full bg-slate-800/50 border-blue-800/30 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:border-blue-600/50 hover:shadow-xl hover:shadow-blue-500/10">
                <CardHeader className="pb-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mb-3"
                  >
                    {f.icon}
                  </motion.div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {f.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-400 leading-relaxed">
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
            Tech Stack
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Enterprise-grade foundation, built to scale with your team
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
                className="p-4 bg-slate-800/50 rounded-2xl border border-blue-800/30 group-hover:border-blue-600/50 transition-all duration-300"
              >
                {t.icon}
              </motion.div>
              <span className="text-sm font-medium text-slate-400 group-hover:text-blue-400 transition-colors">
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
            Use Cases
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Trusted across industries for critical AI applications
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
              className="flex items-center gap-4 bg-slate-800/30 backdrop-blur-sm rounded-xl px-6 py-4 border border-blue-800/30 hover:border-blue-600/50 transition-all duration-300 hover:bg-slate-800/50 group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.4 }}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex-shrink-0"
              />
              <span className="text-lg text-slate-300 group-hover:text-white transition-colors font-medium">
                {uc}
              </span>
            </motion.div>
          ))}
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
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl sm:text-2xl mb-4 text-slate-300 leading-relaxed">
            We're open to exclusive acquisition or flexible licensing plans.
          </p>
          <p className="text-lg text-slate-400 mb-12">
            <span className="font-semibold text-blue-400">Contact:</span>{" "}
            <a href="mailto:nilamadhab47@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors underline">
              nilamadhab47@gmail.com
            </a>
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
                asChild
              >
                <a href="mailto:nilamadhab47@gmail.com?subject=Request%20Access%20to%20FrameFlow">
                  Request Access
                </a>
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

      <footer className="py-12 text-center text-slate-500 border-t border-blue-800/30">
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
