import React, { useState, useEffect } from 'react';

const LoadingSpinner: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">

      <div className="relative">
        <div className="w-24 h-24 rounded-full border-8 border-gray-300"></div>
        <div className="absolute inset-0 w-24 h-24 rounded-full border-8 border-transparent border-t-red-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full border-4 border-white"></div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-xl font-semibold text-gray-700 mb-2">Carregando Pokémons...</p>
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
          <span className="text-sm text-gray-600">Carregando em:</span>
          <span className="text-lg font-bold text-red-500">8s</span>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4 text-center max-w-md">
        Capturando os 151 primeiros Pokémon para você!
      </p>

      <div className="w-64 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500 h-2 rounded-full animate-pulse"
          style={{ width: '100%' }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;