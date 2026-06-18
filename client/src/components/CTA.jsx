import { useNavigate } from 'react-router';

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">

        {/* Small label */}
        <span className="inline-block text-sm text-gray-400 mb-5">
          Start preparing today
        </span>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold font-serif leading-[1.25] tracking-[0.02em] text-white mb-5">
          Prepare Better.
          <br />
          <span className='text-[#b6bfca]'>
             Crack Your Interview.
          </span>
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-base leading-7 max-w-2xl mx-auto mb-10">
          Upload your resume, get AI feedback, practice interview
          questions, and improve step by step before applying.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate('/create-report')}
          className="bg-indigo-600 cursor-pointer hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-px"

        >
          Generate Interview Plan
        </button>

        {/* Small note */}
        <p className="text-sm text-gray-400 mt-7">
         Free of charge, just for you to get started on your interview prep journey.
        </p>

      </div>
    </section>
  );
}