export function Header() {
  return (
    <header className="h-[60px] lg:h-[70px] flex items-center justify-between px-4 sm:px-6 lg:px-12">
      <div className="text-white text-lg sm:text-xl">
        Acceso Chile
      </div>
      <div className="bg-[#A3F73B] text-[#0C0E12] px-3 py-1 rounded-md text-sm shadow-[0_0_15px_rgba(163,247,59,0.4)]">
        Solo hoy
      </div>
    </header>
  );
}
