import React from "react";

const FormSkeleton = () => {
  return (
    <>
      <div className="border border-slate-100 bg-white shadow rounded-lg p-4 w-full mx-auto">
        <div className="animate-pulse">
          <div className="flex flex-col  py-1">
            <div className="w-1/4 h-5 rounded bg-slate-200"></div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="h-8  bg-slate-200 rounded"></div>
              <div className="h-8  bg-slate-200 rounded"></div>
              <div className="h-8  bg-slate-200 rounded"></div>
            </div>
            <div className="w-1/4 h-5 rounded bg-slate-200 mt-3"></div>
            <div className="grid gap-3 mt-3">
              <div className="h-8  bg-slate-200 rounded"></div>
            </div>
            <div className="w-1/4 h-5 rounded bg-slate-200 mt-3"></div>
            <div className="grid gap-3 mt-3">
              <div className="h-8  bg-slate-200 rounded"></div>
            </div>
            <div className="flex justify-end gap-3 mt-3">
              <div className="h-8 w-1/3 bg-slate-200 rounded"></div>
              <div className="h-8 w-1/4 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSkeleton;
