interface ErrorCardProps {
  message: string;
}

export function ErrorCard({ message }: ErrorCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
      <p className="text-red-600 text-sm">{message}</p>
    </div>
  );
}
