export default function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizes = {
    small: { container: "w-8 h-8", text: "text-xs" },
    default: { container: "w-12 h-12", text: "text-sm" },
    large: { container: "w-16 h-16", text: "text-base" },
  };

  const { container, text } = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* Logo Image */}
      <div className={`${container} rounded-2xl overflow-hidden shadow-lg relative group`}>
        <img 
          src="/public_bot.png" 
          alt="RepoExplain Logo" 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Logo Text */}
      {size !== "small" && (
        <div className="flex flex-col">
          <span className={`${size === 'large' ? 'text-2xl' : 'text-xl'} font-bold bg-gradient-to-r from-[#7EC8E3] via-[#8A7CFF] to-[#B9A7FF] bg-clip-text text-transparent`}>
            RepoExplain
          </span>
          <span className={`${text} text-slate-500 -mt-1`}>
            AI-Powered Analysis
          </span>
        </div>
      )}
    </div>
  );
}
