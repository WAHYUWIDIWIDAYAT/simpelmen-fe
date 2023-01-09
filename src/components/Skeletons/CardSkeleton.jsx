import React from "react";

const CardSkeleton = () => {
  return (
    <>
      <div className="border border-slate-100 bg-white shadow rounded-lg p-4 max-w-sm w-full mx-auto h-[250px]">
        <div className="animate-pulse">
          <div className="flex-1 space-y-6 py-1">
            <div className="w-full h-24 rounded bg-slate-200"></div>
            <div className="space-y-3">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="mx-auto h-10 w-40 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSkeleton;
