export default function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizes = {
    small: { container: "w-8 h-8", text: "text-xs" },
    default: { container: "w-12 h-12", text: "text-sm" },
    large: { container: "w-16 h-16", text: "text-base" },
  };

  const { container, text } = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon */}
      <div className={`${container} rounded-2xl bg-gradient-to-br from-[#7EC8E3] via-[#6BB6E8] to-[#8A7CFF] flex items-center justify-center shadow-lg relative overflow-hidden group`}>
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6BB6E8] via-[#8A7CFF] to-[#B9A7FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Icon */}
        <div className="relative z-10">
          <svg className={`${size === 'small' ? 'w-4 h-4' : size === 'large' ? 'w-8 h-8' : 'w-6 h-6'} text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
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
