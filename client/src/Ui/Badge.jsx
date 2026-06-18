export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`bg-[#1e2535] text-[#8b949e] px-3 py-1 rounded-full text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}