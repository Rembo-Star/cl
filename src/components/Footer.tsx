export function Footer() {
  return (
    <footer className="h-[120px] sm:h-[140px] lg:h-[150px] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 mb-4 sm:mb-5">
        <div className="flex items-center gap-2 text-white/60 text-sm sm:text-base">
          <span className="text-base sm:text-lg">18+</span>
        </div>
        <div className="flex items-center gap-2 text-white/60 text-sm sm:text-base">
          <span>Entretenimiento</span>
        </div>
        <div className="flex items-center gap-2 text-white/60 text-sm sm:text-base">
          <span>Uso responsable</span>
        </div>
      </div>
      <p className="text-white/50 text-xs sm:text-sm text-center max-w-3xl px-4">
        Contenido de entretenimiento para adultos (18+). No garantiza ningún resultado.
      </p>
    </footer>
  );
}
