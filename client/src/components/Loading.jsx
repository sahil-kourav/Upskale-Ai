export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">

      {/* Spinner */}
      <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-t-white animate-spin" />

      <p className="text-xs text-gray-500 tracking-widest">
        Please wait...
      </p>

    </div>
  );
}