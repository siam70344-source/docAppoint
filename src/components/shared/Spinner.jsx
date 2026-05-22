const Spinner = () => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
      {/* Animated pure Tailwind spinner matching your app theme */}
      <div className="w-10 h-10 border-4 border-gray-200 border-t-[#00a76f] rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-gray-500 animate-pulse">Loading data...</p>
    </div>
  );
};

export default Spinner;