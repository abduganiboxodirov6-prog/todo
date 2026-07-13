import { NavLink } from "react-router-dom";

interface HeaderProps {
  title: string;
  count: number;
  onSale: boolean;
  onEdit: (id: number, title: string) => void;
}

function Header({ title, count, onSale, onEdit }: HeaderProps) {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[11px] font-bold tracking-[0.2em] transition-all duration-300 uppercase ${
      isActive 
        ? "text-white" 
        : "text-gray-500 hover:text-cyan-400"
    }`;

  return (
    <header className="bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="container mx-auto px-8 py-5 flex items-center justify-between">
        
        {/* Logo Qismi */}
        <div className="flex flex-col">
          <h1 className="text-xl font-black text-white tracking-tighter uppercase">
            {title}
          </h1>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-[9px] font-mono font-bold text-gray-500 tracking-widest uppercase">
              STOCK: <span className="text-cyan-500">{count}</span>
            </span>
            <span className={`text-[8px] font-bold px-2 py-[2px] rounded border ${onSale ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5" : "border-rose-500/30 text-rose-400 bg-rose-500/5"}`}>
              {onSale ? "AVAILABLE" : "UNAVAILABLE"}
            </span>
          </div>
        </div>

        {/* Navigatsiya */}
        <nav>
          <ul className="flex items-center gap-10">
            <li><NavLink to='/' className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to='/about' className={navLinkClass}>About</NavLink></li>
            <li><NavLink to='/product' className={navLinkClass}>Product</NavLink></li>
            <li><NavLink to='/tanStack' className={navLinkClass}>User</NavLink></li>
          </ul>
        </nav>

        {/* Action Button - Neon Glow */}
        <button
          onClick={() => onEdit(1, "Olma")}
          className="group relative px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-300"
        >
          {/* Orqa fon uchun qatlam */}
          <div className="absolute inset-0 bg-cyan-500 blur-[15px] opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative border border-white/20 px-6 py-2 bg-black/40 hover:bg-white hover:text-black transition-colors duration-300">
            Edit Product
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;