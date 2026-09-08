import React from 'react';
import { Heart, Gift, Medal } from 'lucide-react';

export default function PillarsSection() {
  const pillars = [
    {
      icon: <Heart className="w-8 h-8 text-[#13053B]" />,
      title: "Sabor Irresistible",
      desc: "Chocolates seleccionados e ingredientes frescos combinados a la perfección."
    },
    {
      icon: <Gift className="w-8 h-8 text-[#13053B]" />,
      title: "Presentación Única",
      desc: "Diseños personalizados y empaques de regalo listos para cautivar."
    },
    {
      icon: <Medal className="w-8 h-8 text-[#13053B]" />,
      title: "Calidad Garantizada",
      desc: "Preparación ágil, cuidando cada detalle en el proceso artesanal y entrega."
    }
  ];

  return (
    <section className="py-12 bg-white/50 backdrop-blur-sm border-y border-pink-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx} 
              className="p-6 bg-white/80 rounded-2xl border border-pink-100 shadow-sm flex flex-col items-center text-center space-y-3"
            >
              <div className="p-4 bg-[#13053B]/5 rounded-2xl">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-[#3A101C]">{pillar.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}