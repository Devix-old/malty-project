'use client';

export default function CharCounter({ value, min, max, label }) {
  const length = value?.length || 0;
  const isValid = length >= min && length <= max;
  const isNearLimit = length >= max * 0.9 || length <= min * 1.1;
  
  let statusColor = 'text-gray-500';
  let bgColor = 'bg-gray-100';
  
  if (!value || value.length === 0) {
    statusColor = 'text-red-600';
    bgColor = 'bg-red-50';
  } else if (length < min) {
    statusColor = 'text-red-600';
    bgColor = 'bg-red-50';
  } else if (length > max) {
    statusColor = 'text-red-600';
    bgColor = 'bg-red-50';
  } else if (isNearLimit) {
    statusColor = 'text-yellow-600';
    bgColor = 'bg-yellow-50';
  } else {
    statusColor = 'text-green-600';
    bgColor = 'bg-green-50';
  }
  
  return (
    <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-md ${bgColor}`}>
      <span className="text-sm font-medium">{label}:</span>
      <span className={`text-sm font-bold ${statusColor}`}>
        {length} / {min}-{max}
      </span>
      {!isValid && value && (
        <span className="text-xs text-red-600">
          {length < min ? `+${min - length} needed` : `-${length - max} over`}
        </span>
      )}
    </div>
  );
}

