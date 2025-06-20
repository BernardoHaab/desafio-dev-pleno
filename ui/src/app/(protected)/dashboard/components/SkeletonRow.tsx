export function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-24 h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-20 h-4 bg-gray-300 rounded"></div>
      </td>
    </tr>
  );
}
