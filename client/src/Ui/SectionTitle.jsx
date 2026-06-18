export default function SectionTitle({ label, headline, accent, sub, center = true }) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      {label && (
        <p className="text-[#c0c1ff] text-xs font-medium uppercase tracking-[0.2em] mb-4">
          {label}
        </p>
      )}
      <h2 className="text-[32px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#e4e1ed]">
        {headline}{' '}
        {accent && <span className="text-[#c0c1ff]">{accent}</span>}
      </h2>
      {sub && (
        <p className="text-[#908fa0] mt-2">{sub}</p>
      )}
    </div>
  );
}