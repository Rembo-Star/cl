export function CTABlock() {
  const handleClick = () => {
    // This would navigate to the main landing page with the wheel
    console.log('Navigating to main landing page...');
  };

  return (
    <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4">
      <button
        onClick={handleClick}
        className="bg-[#A3F73B] text-[#0C0E12] px-12 sm:px-16 lg:px-20 py-5 sm:py-6 rounded-xl sm:rounded-2xl text-lg sm:text-xl lg:text-2xl hover:bg-[#b5ff4d] transition-all duration-300 shadow-[0_0_30px_rgba(163,247,59,0.5)] hover:shadow-[0_0_40px_rgba(163,247,59,0.7)] w-full sm:w-auto max-w-[340px] mx-auto block"
      >
        Continuar
      </button>
      <p className="text-white/70 text-sm sm:text-base mt-4 sm:mt-5">
        Acceso inmediato · Sin registro previo
      </p>
    </div>
  );
}
