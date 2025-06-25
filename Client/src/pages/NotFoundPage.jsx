function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] md:text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-bold text-white opacity-10 blur-sm leading-none select-none">
            404
          </div>
        </div>

        {/* Page Not Found Text */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-wide">
            Page Not Found
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>

          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-md mx-auto">
            The page you're looking for seems to have vanished into the digital
            void.
          </p>
        </div>

        {/* Floating elements */}
        <div
          className="absolute -top-20 -left-20 w-4 h-4 bg-purple-400 rounded-full opacity-60 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute -top-10 right-20 w-2 h-2 bg-pink-400 rounded-full opacity-60 animate-bounce"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute -bottom-10 -right-10 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 -left-10 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-bounce"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default NotFoundPage;
