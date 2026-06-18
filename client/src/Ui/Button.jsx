export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'font-bold transition-all active:scale-95 cursor-pointer';

  const variants = {
    primary: 'bg-[#c0c1ff] text-[#1000a9] px-8 py-4 rounded-xl flex items-center gap-2 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]',
    secondary: 'border border-[#464554] text-[#e4e1ed] px-8 py-4 rounded-xl hover:bg-[#34343d]/30',
    nav: 'bg-[#c0c1ff] text-[#1000a9] px-6 py-2 rounded-lg hover:bg-[#8083ff]',
    cta: 'bg-[#c0c1ff] text-[#1000a9] px-10 py-5 rounded-2xl text-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}