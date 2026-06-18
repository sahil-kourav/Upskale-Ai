export default function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-[#161b22] border border-[#1e2535] rounded-2xl transition-all duration-300 hover:border-[#6366f1] hover:shadow-[0_0_15px_rgba(99,102,241,0.1)] ${className}`}
    >
      {children}
    </div>
  );
}