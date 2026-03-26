import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 relative bg-noise">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="text-center relative z-10">
        <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 tracking-tighter opacity-20">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Path Not Found</h2>
        <p className="text-white/60 max-w-md mx-auto mb-8">
          The intelligence stream you're looking for doesn't exist or has been relocated to a new sector.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-black bg-white rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Hub
        </Link>
      </div>
    </div>
  );
}
