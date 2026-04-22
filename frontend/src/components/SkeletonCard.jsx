import React from 'react';

const SkeletonCard = () => (
  <div className="block">
    <div className="aspect-[3/4] skeleton w-full" />
    <div className="mt-4 space-y-2 px-0.5">
      <div className="h-3.5 skeleton rounded w-3/4" />
      <div className="h-3 skeleton rounded w-1/2" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 4, cols = 4 }) => {
  const colClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[cols] ?? 'sm:grid-cols-2 lg:grid-cols-4';

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-6 lg:gap-8`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonCard;
