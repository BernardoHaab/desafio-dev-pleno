export function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow animate-pulse">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-300 rounded"></div>
        <div className="ml-4">
          <div className="w-16 h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-24 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
