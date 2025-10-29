import React, { useState, useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Shield,
  Zap,
  Eye,
  Bell,
  Download,
  ChevronRight,
  Play,
  Check,
  AlertTriangle,
  DollarSign,
  Clock,
  Users,
  Lock,
  TrendingUp,
  Sparkles,
  Star,
  ArrowUp,
} from "lucide-react";
import { provideFeedback } from "../utils/audioFeedback";

// Particle component for background animation
const Particle = ({ delay = 0 }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white/20 rounded-full"
      initial={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0,
      }}
      animate={{
        y: [null, -100],
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
      }}
    />
  );
};

// Floating particles background
const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <Particle key={i} delay={i * 0.1} />
      ))}
    </div>
  );
};

// Scroll progress indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 z-50 origin-left"
      style={{ scaleX }}
    />
  );
};

// Typing animation hook
const useTypingAnimation = (text, speed = 100) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
};

// Floating Action Button
const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    provideFeedback("click");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const CreatorChainLanding = () => {
  const [formData, setFormData] = useState({
    email: "",
    creatorType: "",
    platform: "",
    contentVolume: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Formspree setup
  const [formspreeState, formspreeSubmit] = useForm("xdkpgdlw");
  useEffect(() => {
    if (formspreeState.succeeded) {
      setSubmitted(true);
      provideFeedback("success");
    }
  }, [formspreeState.succeeded]);

  // Typing animation for hero text
  const { displayText: heroText, isComplete: heroComplete } =
    useTypingAnimation("Protect Your Digital Assets", 80);

  // Form validation
  useEffect(() => {
    const isValid = formData.email.includes("@") && formData.email.length > 5;
    setIsFormValid(isValid);
  }, [formData.email]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      provideFeedback("error");
      return;
    }

    // Submit to Formspree
    formspreeSubmit(e);
  };

  const problemStats = [
    {
      value: "2.2B",
      label: "copyright claims processed by YouTube in 2024",
      source: "YouTube Transparency Report 2024",
      id: "counter-2.2",
    },
    {
      value: "$75B",
      label: "annual global losses to digital piracy",
      source: "ElectroIQ Piracy Statistics 2024",
      id: "counter-75",
    },
    {
      value: "141B",
      label: "visits to piracy sites in 2023 alone",
      source: "MUSO & Kearney Research Study",
      id: "counter-141",
    },
  ];

  const features = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Blockchain Registration",
      description:
        "Immutable proof of ownership that establishes your copyright claim with cryptographic certainty.",
      benefit: "Legal protection that can't be disputed",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Eye className="w-7 h-7" />,
      title: "AI-Powered Monitoring",
      description:
        "Advanced computer vision scans major platforms 24/7 to detect unauthorized use of your content.",
      benefit: "Catch thieves before they profit",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Automated Takedowns",
      description:
        "Submit DMCA takedown requests with blockchain proof automatically when theft is detected.",
      benefit: "Faster resolution, less manual work",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Revenue Recovery",
      description:
        "Track and calculate lost revenue from stolen content to support legal claims and platform disputes.",
      benefit: "Quantify your losses for recovery",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Install & Connect",
      description:
        "Add the browser extension and connect your creator accounts across platforms.",
      icon: <Download className="w-6 h-6" />,
    },
    {
      step: "02",
      title: "Register Content",
      description:
        "One-click registration creates immutable blockchain records of your original content.",
      icon: <Lock className="w-6 h-6" />,
    },
    {
      step: "03",
      title: "Automatic Protection",
      description:
        "Our AI monitors the web continuously and alerts you when unauthorized copies are found.",
      icon: <Bell className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Background with Particles */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)
            `,
          }}
          animate={{
            opacity: [0.8, 1, 0.8],
            background: [
              `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
               radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
               radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
               linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)`,
              `radial-gradient(circle at 75% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
               radial-gradient(circle at 25% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
               radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
               linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)`,
              `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
               radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
               radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
               linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)`,
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <ParticleBackground />
      </div>

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Enhanced Navigation */}
      <motion.nav
        className="relative z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                CreatorChain
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-purple-400" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 mb-8"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </motion.div>
              <span className="text-red-300 text-sm font-medium">
                Digital piracy causes $75B in annual global losses
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-black mb-8 leading-tight"
              variants={itemVariants}
            >
              <span className="block text-white mb-2">Protect Your Brand</span>
              <motion.span
                className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {heroComplete ? heroText : heroText}
                {!heroComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    |
                  </motion.span>
                )}
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              The first blockchain-powered platform that automatically protects
              your social media content, monitors video platforms for theft, and
              helps you recover stolen revenue before DMCA systems are
              overwhelmed.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={() =>
                  document
                    .getElementById("waitlist-form")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-purple-500/25 relative overflow-hidden group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Join Early Access</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
              <motion.button
                onClick={() => {
                  provideFeedback("click");
                  setIsVideoPlaying(true);
                }}
                className="bg-white/5 border border-white/20 backdrop-blur text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 hover:bg-white/10 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="w-5 h-5" />
                </motion.div>
                Watch Demo
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="relative py-20 px-6 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              The Content Theft Crisis
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              With over 2.2 billion copyright claims processed annually and
              platforms overwhelmed by DMCA requests, creators need automated
              protection that works before theft occurs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {problemStats.map((stat, index) => (
              <motion.div
                key={index}
                id={stat.id}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur border border-white/10 rounded-xl p-8 text-center relative overflow-hidden group"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(99, 102, 241, 0.3)",
                  boxShadow: "0 10px 30px rgba(99, 102, 241, 0.1)",
                }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-5xl font-black text-white mb-4 relative z-10">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-lg mb-2 relative z-10">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500 relative z-10">
                  {stat.source}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-8"
            variants={itemVariants}
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Current Solutions Fall Short
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  With YouTube processing over 2 billion copyright claims
                  annually, DMCA systems are overwhelmed. Manual monitoring is
                  ineffective, and by the time stolen content is removed,
                  thieves have already profited. You need proactive blockchain
                  protection, not reactive cleanup.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative py-20 px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              How CreatorChain Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced technology meets creator needs with automated protection
              that works around the clock.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur border border-white/10 rounded-xl p-8 relative overflow-hidden group"
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(99, 102, 241, 0.3)",
                }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <div className="flex items-start gap-4 relative z-10">
                  <motion.div
                    className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Check className="w-4 h-4 text-green-400" />
                      </motion.div>
                      <span className="text-green-400 font-medium">
                        {feature.benefit}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="mb-20" variants={itemVariants}>
            <h3 className="text-3xl font-bold text-center text-white mb-12">
              Simple 3-Step Process
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative text-center group"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="bg-gradient-to-br from-indigo-600 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 relative overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">{step.icon}</div>
                  </motion.div>
                  <div className="text-4xl font-black text-indigo-400 mb-4">
                    {step.step}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h4>
                  <p className="text-gray-300">{step.description}</p>

                  {index < howItWorks.length - 1 && (
                    <motion.div
                      className="hidden md:block absolute top-8 -right-4 w-8 h-8"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronRight className="w-8 h-8 text-indigo-500/30" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section
        id="waitlist-form"
        className="relative py-20 px-6 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent"
      >
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Join the Early Access Program
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Be among the first creators to protect your content with
              blockchain technology. Limited spots available for our beta
              launch.
            </p>
          </motion.div>

          {!submitted ? (
            <motion.form
              action="https://formspree.io/f/xdkpgdlw"
              method="POST"
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur border border-white/10 rounded-2xl p-8"
              variants={itemVariants}
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <motion.input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 ${
                      isFormValid
                        ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                        : "border-white/20 focus:border-indigo-500 focus:ring-indigo-500"
                    }`}
                    placeholder="your.email@example.com"
                    whileFocus={{ scale: 1.02 }}
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={formspreeState.errors}
                  />
                  {formData.email && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 flex items-center gap-2"
                    >
                      {isFormValid ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm">
                            Valid email
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-red-400 text-sm">
                            Invalid email
                          </span>
                        </>
                      )}
                    </motion.div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Creator Type
                  </label>
                  <motion.select
                    name="creatorType"
                    value={formData.creatorType}
                    onChange={(e) =>
                      setFormData({ ...formData, creatorType: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="">Select type</option>
                    <option value="youtuber">YouTuber</option>
                    <option value="tiktoker">TikToker</option>
                    <option value="instagrammer">Instagram Creator</option>
                    <option value="podcaster">Podcaster</option>
                    <option value="streamer">Live Streamer</option>
                    <option value="other">Other</option>
                  </motion.select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Primary Platform
                  </label>
                  <motion.select
                    name="platform"
                    value={formData.platform}
                    onChange={(e) =>
                      setFormData({ ...formData, platform: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="">Select platform</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="instagram">Instagram</option>
                    <option value="twitch">Twitch</option>
                    <option value="multiple">Multiple Platforms</option>
                  </motion.select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Monthly Content Volume
                  </label>
                  <motion.select
                    name="contentVolume"
                    value={formData.contentVolume}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contentVolume: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="">Select volume</option>
                    <option value="1-10">1-10 pieces</option>
                    <option value="11-50">11-50 pieces</option>
                    <option value="51-100">51-100 pieces</option>
                    <option value="100+">100+ pieces</option>
                  </motion.select>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  isFormValid
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl hover:shadow-purple-500/25"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
                whileHover={isFormValid ? { scale: 1.02 } : {}}
                whileTap={isFormValid ? { scale: 0.98 } : {}}
              >
                {isFormValid
                  ? "Join Early Access Waitlist"
                  : "Please enter a valid email"}
              </motion.button>

              <p className="text-center text-sm text-gray-400 mt-4">
                We'll notify you when CreatorChain launches. No spam, ever.
              </p>
            </motion.form>
          ) : (
            <motion.div
              className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-2xl p-8 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 1 }}
              >
                <Check className="w-8 h-8 text-green-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">You're In!</h3>
              <p className="text-gray-300 text-lg">
                Welcome to the early access program. We'll be in touch soon with
                exclusive updates and beta access.
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <motion.div
                className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Shield className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                CreatorChain
              </span>
            </div>
            <div className="flex gap-8 text-sm text-gray-400">
              <motion.a
                href="#"
                className="hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Contact
              </motion.a>
            </div>
            <div className="text-sm text-gray-500">
              © 2025 CreatorChain. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              provideFeedback("click");
              setIsVideoPlaying(false);
            }}
          >
            <motion.div
              className="relative max-w-4xl w-full bg-gray-900 rounded-xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play className="w-16 h-16 text-white mb-4 mx-auto" />
                  </motion.div>
                  <p className="text-white text-xl">Product Demo Video</p>
                  <p className="text-gray-400 mt-2">
                    See CreatorChain in action
                  </p>
                </div>
              </div>
              <motion.button
                onClick={() => {
                  provideFeedback("click");
                  setIsVideoPlaying(false);
                }}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur text-white w-10 h-10 rounded-full flex items-center justify-center transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default CreatorChainLanding;
