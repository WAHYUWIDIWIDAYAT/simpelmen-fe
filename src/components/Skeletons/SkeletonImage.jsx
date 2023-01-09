import React from "react";

const SkeletonImage = () => {
  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 w-full h-full">
        <div className="animate-pulse">
          <div className="flex-1 space-y-6 py-1">
            <div className="w-full h-[300px] rounded bg-slate-200"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonImage;
