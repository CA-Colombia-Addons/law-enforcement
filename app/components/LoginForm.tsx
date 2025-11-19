'use client';

import { motion } from 'framer-motion';
import { FaDiscord, FaShieldAlt, FaCar } from 'react-icons/fa';

export default function LoginForm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 relative">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-white"></div>
      
      {/* Government Strip */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-blue-800 to-red-500"></div>

      {/* Header */}
      <motion.header 
        className="w-full max-w-4xl mx-auto text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex flex-col items-center justify-center gap-6 mb-8"
        >
          {/* Official Logo Container */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center">
                <FaCar className="text-white text-2xl" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">RUNT</h1>
                <p className="text-sm text-gray-600 font-medium">Registro Único Nacional de Tránsito</p>
                <p className="text-xs text-gray-500">República de Colombia</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="bg-blue-50 border-l-4 border-blue-800 p-4 max-w-2xl mx-auto">
          <p className="text-gray-700 text-lg font-medium">
            CA Colombia ER:LC
          </p>
        </div>
      </motion.header>

      {/* Login Card */}
      <motion.div 
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative z-10 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaShieldAlt className="text-blue-800 text-lg" />
            <h2 className="text-xl font-bold text-gray-900">Acceso al Sistema</h2>
          </div>
          <p className="text-gray-600 text-sm">Autenticación mediante Discord</p>
        </div>

        {/* Discord Login */}
        <div className="space-y-4">
          <motion.a
            href="/api/auth/discord"
            className="flex items-center justify-center gap-3 w-full bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold py-4 px-6 rounded-md transition-all duration-200 border border-[#5865F2] hover:shadow-md"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaDiscord className="text-xl" />
            <span>Ingresar con Discord</span>
          </motion.a>
        </div>

        {/* Fiction Notice */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              CA Colombia ER:LC
            </p>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        className="mt-12 text-center text-gray-600 text-sm relative z-10 w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="border-t border-gray-200 pt-6">
          <p className="font-medium text-gray-700 mb-2">
            © {new Date().getFullYear()} Simulación CA Colombia ER:LC
          </p>
          <p className="text-xs text-gray-500">
            Plataforma de simulación para roleplay
          </p>
        </div>
      </motion.footer>
    </div>
  );
}