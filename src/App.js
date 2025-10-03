import React, { useState, useEffect } from 'react';
import { Menu, X, Cloud, Download, ExternalLink, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle scroll for active section and header background
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };

    try {
      const response = await fetch('https://a57qomkmynewvlu25c623ukohi0odsvd.lambda-url.us-east-1.on.aws/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
        e.target.reset();
      } else {
        setFormStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Network error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white relative overflow-x-hidden">
      {/* Animated Cloud Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <Cloud
            key={i}
            className={`absolute text-white animate-float-${(i % 4) + 1}`}
            size={40 + (i % 4) * 15}
            style={{
              top: `${5 + (i % 6) * 15}%`,
              left: `-100px`,
              animationDelay: `${i * 3}s`,
              opacity: 0.1 + (i % 3) * 0.1
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-lg">
                WL
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Wani Lado
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['home', 'about', 'projects', 'resume', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeSection === item
                        ? 'bg-purple-600 text-white'
                        : 'text-purple-200 hover:text-white hover:bg-purple-600/50'
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-purple-200 hover:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'projects', 'resume', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 ${
                    activeSection === item
                      ? 'bg-purple-600 text-white'
                      : 'text-purple-200 hover:text-white hover:bg-purple-600/50'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent animate-pulse">
              Wani Lado
            </h1>
            <p className="text-2xl md:text-3xl text-purple-200 mb-6">
              Cloud Security Engineer
            </p>
            <p className="text-lg text-purple-300 max-w-2xl mx-auto leading-relaxed">
              Cloud security engineer specializing in IAM, AWS security, and enterprise compliance. Building secure cloud infrastructure to protect critical systems.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection('resume')}
              className="px-8 py-3 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-600 transform hover:scale-105 transition-all duration-300"
            >
              View Resume
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <p className="text-base text-purple-200 leading-relaxed">
                Nashville native through and through! Born and raised in Music City, I'm a dedicated Cloud Computing major at WGU with hands-on experience in IT support and system administration. What sets me apart is how my lifelong passion for sports has shaped my approach to technology and teamwork.
              </p>

              <p className="text-base text-purple-200 leading-relaxed">
                I'm a huge sports enthusiast - NFL, NBA, Futbol, and MLB are my outlets outside of work. Whether I'm cheering on the Saints, following the latest NBA playoffs, catching a soccer match, or analyzing MLB stats, sports have taught me invaluable lessons about discipline, strategy, resilience, and most importantly, teamwork. These principles drive everything I do in tech.
              </p>
              <p className="text-base text-purple-200 leading-relaxed">
                With over two years of experience in IT support and a strong foundation in AWS, identity and access management, and security administration, I bring that same collaborative spirit and strategic thinking to cloud security engineering. My hands-on experience with Entra ID, CyberArk PAM, Microsoft Intune, and enterprise security tools has given me deep insight into protecting privileged access and securing cloud environments. Just like in sports, successful cloud security is all about coordination, communication, and executing defense strategies as a team. I'm passionate about advancing into cloud security engineering roles where I can solve real-world security challenges and protect critical infrastructure through strategic security implementations.
              </p>
              <div className="flex flex-wrap gap-4 pt-6">
                <div className="flex items-center gap-2 text-purple-300">
                  <MapPin size={20} />
                  <span>Nashville, TN</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div className="bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full">
                <h3 className="text-xl font-semibold mb-4 text-purple-300">☁️ Cloud Platforms</h3>
                <ul className="space-y-2 text-purple-200">
                  <li>Amazon Web Services (AWS)</li>
                  <li>EC2, S3, Lambda, IAM</li>
                  <li>CloudTrail, CloudWatch, SNS</li>
                  <li>Route 53, VPC</li>
                </ul>
              </div>
              
              <div className="bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full">
                <h3 className="text-xl font-semibold mb-4 text-purple-300">🔐 Identity & Security Tools</h3>
                <ul className="space-y-2 text-purple-200">
                  <li>Entra ID (Azure AD)</li>
                  <li>CyberArk PAM</li>
                  <li>Microsoft Intune</li>
                  <li>BeyondTrust, Okta</li>
                  <li>Trellix Encryption</li>
                </ul>
              </div>
              
              <div className="bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full">
                <h3 className="text-xl font-semibold mb-4 text-purple-300">🎓 Certifications</h3>
                <ul className="space-y-2 text-purple-200">
                  <li>AWS Solutions Architect</li>
                  <li>AWS Cloud Practitioner</li>
                  <li>CompTIA Network+</li>
                  <li>CompTIA Security+</li>
                </ul>
              </div>
              
              <div className="bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full">
                <h3 className="text-xl font-semibold mb-4 text-purple-300">💼 Experience</h3>
                <ul className="space-y-2 text-purple-200">
                  <li>2+ Years IT Support</li>
                  <li>Tier 2 Security Support</li>
                  <li>IAM Administration</li>
                  <li>HIPAA Compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Security Monitoring System",
                description: "Built comprehensive security detection system using AWS CloudTrail, CloudWatch, and SNS to monitor and alert on sensitive data access. Implemented real-time notifications for secrets retrieval with automated email alerts and troubleshooting capabilities.",
                tech: ["CloudTrail", "CloudWatch", "SNS", "Secrets Manager"],
                icon: "🔐"
              },
              {
                title: "Portfolio Website Infrastructure",
                description: "Designed and deployed scalable portfolio website using React and AWS Amplify with automated CI/CD pipeline. Configured Route 53 for DNS management, CloudFront CDN for global distribution, and SSL certificates for secure HTTPS. Implemented GitHub integration for continuous deployment with custom domain management.",
                tech: ["AWS Amplify", "Route 53", "CloudFront", "GitHub Actions"],
                icon: "🚀"
              },
              {
                title: "Serverless Application Stack",
                description: "Created and deployed serverless applications using AWS Lambda, API Gateway, and DynamoDB.",
                tech: ["Lambda", "API Gateway", "DynamoDB", "Python"],
                icon: "⚡"
              },
              {
                title: "Monitoring & Alerting System",
                description: "Implemented comprehensive monitoring solution with real-time alerting and dashboard visualization.",
                tech: ["CloudWatch", "SNS", "Grafana", "Python"],
                icon: "📊"
              },
              {
                title: "Containerized Web Application",
                description: "Dockerized full-stack application with automated deployment and load balancing on AWS ECS.",
                tech: ["Docker", "ECS", "Load Balancer", "Auto Scaling"],
                icon: "🌐"
              },
              {
                title: "Infrastructure as Code Templates",
                description: "Collection of reusable CloudFormation and Terraform templates following AWS best practices.",
                tech: ["CloudFormation", "Terraform", "AWS", "Best Practices"],
                icon: "📝"
              }
            ].map((project, index) => (
              <div
                key={index}
                className="bg-black/30 backdrop-blur-lg rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transform hover:scale-105 transition-all duration-300 group"
              >
                <div className="p-8 text-center">
                  <div className="text-4xl mb-4">{project.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-purple-200 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-purple-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-purple-600/30 rounded-full text-sm text-purple-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 justify-center">
                    {project.title === "Security Monitoring System" ? (
                      <a
                        href="/legendary-aws-security-monitoring.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
                      >
                        <ExternalLink size={16} />
                        View Documentation
                      </a>
                    ) : (
                      <>
                        <button className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors">
                          <ExternalLink size={16} />
                          Demo
                        </button>
                        <button className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors">
                          <Github size={16} />
                          Code
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Resume
          </h2>
          
          <div className="bg-black/30 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20">
            {/* Download Resume Button */}
            <div className="flex justify-center mb-8">
              <a
                href="/Lado_Wani_Resume.pdf"
                download="Lado_Wani_Resume.pdf"
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Download size={20} />
                Download Resume
              </a>
            </div>

            {/* Professional Experience */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-purple-300">Professional Experience</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <h4 className="text-xl font-semibold text-white">Client Support Specialist Sr (Tier 2)/ Biomedical IT Support</h4>
                    <span className="text-purple-300">05/2024 – Present</span>
                  </div>
                  <p className="text-purple-200 mb-2">Robert Half w/Leidos QTC Health Services • Nashville, TN</p>

                  <div className="mb-3">
                    <p className="text-purple-200 font-bold mb-2">Enterprise Tier 2 IT Support</p>
                    <ul className="text-purple-300 space-y-1 ml-2">
                      <li>• Provided escalation support for 200+ on-site and remote staff, resolving advanced networking, application, and access issues</li>
                      <li>• Secured endpoints and enterprise data with Trellix encryption and recovery key management</li>
                      <li>• Integrated CyberArk PAM with Active Directory to safeguard privileged accounts and strengthen enterprise access security</li>
                      <li>• Automated setup and troubleshooting workflows with PowerShell, reducing configuration and support times by 40%</li>
                      <li>• Delivered secure remote assistance through Bomgar, improving resolution time and end-user satisfaction</li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-purple-200 font-bold mb-2">Biomedical IT Support</p>
                    <ul className="text-purple-300 space-y-1 ml-2">
                      <li>• Supported clinical and biomedical systems across multiple clinics, ensuring HIPAA compliance and uptime for patient-critical devices</li>
                      <li>• Administered Entra ID (Azure AD) for user and device management, enforcing compliance and role-based access controls</li>
                      <li>• Deployed and imaged devices using Microsoft Intune, standardizing secure configurations and device lifecycle management</li>
                      <li>• Partnered with clinical staff to resolve device/application issues, ensuring minimal disruption to patient care</li>
                    </ul>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <h4 className="text-xl font-semibold text-white">Service Desk Analyst</h4>
                    <span className="text-purple-300">11/2023 – 03/2024</span>
                  </div>
                  <p className="text-purple-200 mb-2">TEKsystems w/LKQ Corporation • Nashville, TN</p>
                  <ul className="text-purple-300 space-y-1">
                    <li>• Managed IT assets for 5,000+ employees at LKQ NAHQ</li>
                    <li>• Administered Active Directory user accounts and Mobile Device Management</li>
                    <li>• Utilized Microsoft SCCM for OS imaging and software installation</li>
                    <li>• Implemented BeyondTrust and Okta for secure access management</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <h4 className="text-xl font-semibold text-white">Help Desk Technician</h4>
                    <span className="text-purple-300">02/2023 – 07/2023</span>
                  </div>
                  <p className="text-purple-200 mb-2">Apex Systems w/Dell/Boeing • Nashville Metropolitan Area</p>
                  <ul className="text-purple-300 space-y-1">
                    <li>• Serviced internal and external clients within Fortune 500 network</li>
                    <li>• Troubleshot DNS, proxy, and connectivity issues using PowerShell</li>
                    <li>• Provided remote technical assistance via DameWare and Skype</li>
                    <li>• Managed ServiceNow ticketing system for efficient issue resolution</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-purple-300">Education</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-xl font-semibold text-white">Bachelor of Science in Cloud Computing</h4>
                  <p className="text-purple-200">Western Governors University • 2022 – 2025</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-xl font-semibold text-white">Systems Administration & Management</h4>
                  <p className="text-purple-200">Nashville State Community College • 2021 – 2022</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-purple-300">Certifications</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "AWS Certified Solutions Architect Associate",
                  "CompTIA Security+ (Feb 2025)",
                  "CompTIA Network+ (Jan 2024)", 
                  "AWS Certified Cloud Practitioner (Sept 2022)",
                  "ITIL Foundation Level (Feb 2023)",
                  "LPI Linux Essentials (Dec 2022)"
                ].map((cert, index) => (
                  <div key={index} className="bg-purple-600/20 rounded-lg p-3">
                    <span className="text-purple-200">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-purple-200 mb-12 text-center">
            Ready to discuss cloud security opportunities and collaborate on innovative projects
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-purple-300 mb-6">Contact Information</h3>

              <div className="space-y-4">
                <a
                  href="mailto:wani.lado615@gmail.com"
                  className="flex items-center gap-4 p-4 bg-black/30 backdrop-blur-lg rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 text-purple-200 hover:text-white group"
                >
                  <div className="p-3 bg-purple-600/20 rounded-lg group-hover:bg-purple-600/30 transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Email</p>
                    <p className="font-medium">wani.lado615@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/wani-lado615"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-black/30 backdrop-blur-lg rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 text-purple-200 hover:text-white group"
                >
                  <div className="p-3 bg-purple-600/20 rounded-lg group-hover:bg-purple-600/30 transition-colors">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">LinkedIn</p>
                    <p className="font-medium">linkedin.com/in/wani-lado615</p>
                  </div>
                </a>

                <a
                  href="https://github.com/wani-lado615"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-black/30 backdrop-blur-lg rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 text-purple-200 hover:text-white group"
                >
                  <div className="p-3 bg-purple-600/20 rounded-lg group-hover:bg-purple-600/30 transition-colors">
                    <Github size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">GitHub</p>
                    <p className="font-medium">github.com/wani-lado615</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-black/30 backdrop-blur-lg rounded-xl border border-purple-500/20">
                  <div className="p-3 bg-purple-600/20 rounded-lg">
                    <MapPin size={24} className="text-purple-200" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Location</p>
                    <p className="font-medium text-purple-200">Nashville, TN</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-black/30 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-semibold text-purple-300 mb-6">Send a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-purple-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-purple-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {formStatus.message && (
                  <div className={`mt-4 p-4 rounded-lg ${formStatus.type === 'success' ? 'bg-green-500/20 border border-green-500/40 text-green-200' : 'bg-red-500/20 border border-red-500/40 text-red-200'}`}>
                    {formStatus.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-purple-500/20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-purple-300">
            © 2025 Wani Lado. Built with passion for cloud computing and cybersecurity innovation.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;