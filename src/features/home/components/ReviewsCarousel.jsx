import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function ReviewsCarousel() {
  const reviews = [
    {
      id: 1,
      client: "Mariana Gómez",
      rating: 5,
      comment: "¡Simplemente espectaculares! El empaque llegó impecable y el sabor del chocolate con la fresa fresquita es otra cosa.",
      badge: "Sabor y Presentación",
      date: "Hace 2 días"
    },
    {
      id: 2,
      client: "Carlos Restrepo",
      rating: 5,
      comment: "Pedí un detalle personalizado para el cumpleaños de mi novia y superó las expectativas. La entrega fue muy puntual.",
      badge: "Entrega a tiempo",
      date: "Hace 1 semana"
    },
    {
      id: 3,
      client: "Valentina Henao",
      rating: 5,
      comment: "La atención al detalle se nota desde que abres la caja. ¡Las fresas estaban gigantes y deliciosas!",
      badge: "Calidad Premium",
      date: "Hace 2 semanas"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const nextReview = () => setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#3A101C]">
          Lo que dicen nuestros clientes
        </h2>
        <p className="text-gray-600">
          Opiniones reales verificadas de personas que han endulzado sus momentos con ChocoBerry.
        </p>
      </div>

      <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-pink-100">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="flex gap-1 text-amber-400">
            {[...Array(reviews[currentIndex].rating)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-current" />
            ))}
          </div>

          <p className="text-lg md:text-xl text-gray-700 italic font-medium leading-relaxed max-w-2xl">
            "{reviews[currentIndex].comment}"
          </p>

          <div className="space-y-1">
            <h4 className="font-bold text-lg text-[#13053B]">{reviews[currentIndex].client}</h4>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-[#13053B]/10 text-[#13053B] font-semibold">
                {reviews[currentIndex].badge}
              </span>
              <span className="text-xs text-gray-400">• {reviews[currentIndex].date}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={prevReview}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg border border-gray-100 text-[#13053B] hover:bg-[#13053B] hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button 
          onClick={nextReview}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg border border-gray-100 text-[#13053B] hover:bg-[#13053B] hover:text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-[#13053B]" : "w-2.5 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}