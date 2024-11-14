import { motion } from 'framer-motion';
import { Search, Scan, Shield, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import InteractiveDots from '../components/InteractiveDots';
import Bg2 from '../assets/bg2.png'

const Home = () => {
  const features = [
    {
      icon: <Scan className="w-6 h-6 text-cyan-400" />,
      title: 'Advanced Face Detection',
      description: 'State-of-the-art facial recognition technology with high accuracy.',
    },
    {
      icon: <Search className="w-6 h-6 text-blue-400" />,
      title: 'Quick Search',
      description: 'Lightning-fast search capabilities across large databases.',
    },
    {
      icon: <Shield className="w-6 h-6 text-indigo-400" />,
      title: 'Secure Processing',
      description: 'Enterprise-grade security for all your facial recognition needs.',
    },
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Scientist',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=500',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Lead Engineer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500',
    },
    {
      name: 'Emily Thompson',
      role: 'Product Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500',
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[90vh] flex items-center justify-center overflow-hidden"
      >
        <InteractiveDots />
        
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-indigo-900/40 to-purple-900/40 mix-blend-multiply" />
          <img
            src={Bg2}
            alt="AI Technology"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Neon Glow Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              Face Search AI
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 text-shadow-lg">
              Advanced facial recognition powered by cutting-edge AI technology
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]"
            >
              Try Now
              <Brain className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-black/50 to-blue-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-8 rounded-xl bg-gradient-to-br from-gray-900/90 to-blue-900/20 border border-blue-500/20 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-blue-100">{feature.title}</h3>
                <p className="text-blue-200/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">About Us</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We're a team of AI experts and engineers passionate about pushing the boundaries
              of facial recognition technology while maintaining the highest standards of privacy and security.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-xl aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-blue-300">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;