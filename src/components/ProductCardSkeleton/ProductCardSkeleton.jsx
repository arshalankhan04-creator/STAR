export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white border border-transparent animate-pulse">
      {/* Image placeholder */}
      <div className="w-full aspect-square bg-[#F0F0EA]" />

      {/* Text placeholders */}
      <div className="flex flex-col items-center px-3 pt-4 pb-2 gap-2">
        <div className="h-3 w-3/4 bg-[#EAEAE4] rounded-sm" />
        <div className="h-2.5 w-1/2 bg-[#EAEAE4] rounded-sm" />
        <div className="h-4 w-1/3 bg-[#EAEAE4] rounded-sm mt-1" />
      </div>

      {/* Button placeholder */}
      <div className="px-3 pb-4 mt-auto">
        <div className="w-full h-10 bg-[#EAEAE4] rounded-sm" />
      </div>
    </div>
  );
}
