// import { useNavigate } from 'react-router';

// export default function CTA() {
//   const navigate = useNavigate();

//   return (
//     <section className="py-20 px-6">
//       <div className="max-w-3xl mx-auto text-center">

//         {/* Small label */}
//         <span className="inline-block text-sm text-gray-400 mb-5">
//           Start preparing today
//         </span>

//         {/* Heading */}
//         <h2 className="text-3xl md:text-5xl font-bold font-serif leading-[1.25] tracking-[0.02em] text-white mb-5">
//           Prepare Better.
//           <br />
//           <span className='text-[#b6bfca]'>
//              Crack Your Interview.
//           </span>
//         </h2>

//         {/* Description */}
//         <p className="text-gray-400 text-base leading-7 max-w-2xl mx-auto mb-10">
//           Upload your resume, get AI feedback, practice interview
//           questions, and improve step by step before applying.
//         </p>

//         {/* CTA */}
//         <button
//           onClick={() => navigate('/create-report')}
//           className="bg-indigo-600 cursor-pointer hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-px"

//         >
//           Generate Interview Plan
//         </button>

//         {/* Small note */}
//         <p className="text-sm text-gray-400 mt-7">
//          Free of charge, just for you to get started on your interview prep journey.
//         </p>

//       </div>
//     </section>
//   );
// }












import React from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaArrowRight, FaMicrophoneAlt } from "react-icons/fa";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#0a0a12] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-6xl mx-auto overflow-hidden rounded-3xl bg-gray-800 px-6 sm:px-12 py-12 sm:py-16 text-center"
      >
        <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-10 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-[0.01em] leading-tight">
            Your Next Opportunity Starts Here
          </h2>

          <p className="mt-4 text-indigo-100/90 text-sm sm:text-base max-w-xl mx-auto">
            Start preparing today and improve your interview success rate.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/create-report")}
              className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-50 transition"
            >
              Start Free
              <FaArrowRight size={13} />
            </button>

            <button
              onClick={() => navigate("/mock-interview")}
              className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-xl transition"
            >
              Explore Mock Interview
              <FaMicrophoneAlt size={13} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;