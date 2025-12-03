import React from 'react';

interface Props {
  count?: number;
}

export const LoadingSkeleton: React.FC<Props> = ({ count = 12 }) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {skeletons.map((_, index) => (
        <div 
          key={index} 
          className="bg-white rounded-2xl shadow-md border border-zinc-200 overflow-hidden p-4 animate-pulse h-64 flex flex-col items-center justify-between"
        >
          {/* Espaço para Botão Favorito */}
          <div className="w-full h-8 flex justify-end">
            <div className="w-10 h-10 bg-zinc-200 rounded-full"></div>
          </div>
          
          {/* Espaço para Imagem */}
          <div className="w-32 h-32 bg-zinc-200 rounded-full"></div>
          
          {/* Espaço para ID */}
          <div className="w-12 h-4 bg-zinc-200 rounded-lg mt-2"></div>
          
          {/* Espaço para Nome */}
          <div className="w-3/4 h-5 bg-zinc-200 rounded-lg mt-2"></div>
        </div>
      ))}
    </div>
  );
};