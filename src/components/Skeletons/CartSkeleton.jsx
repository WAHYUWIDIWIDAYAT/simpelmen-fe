import React from "react";

const CartSkeleton = () => {
  return (
    <>
      <div className="skeleton-cart bg-white rounded-lg shadow-lg p-6 relative">
        <div className="animate-pulse absolute top-7 left-8">
          <div className="w-full flex justify-start">
            <button
              className={`w-5 h-5 p-[2px] rounded-[.25rem] bg-white overflow-hidden`}
            >
              <div className="w-[50px] h-[50px] rounded-[3px] bg-slate-200"></div>
            </button>
          </div>
        </div>
        <div className="ml-10">
          <div className="animate-pulse">
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2 lg:col-span-1 h-[300px] rounded bg-slate-200"></div>
              <div className="col-span-2 lg:col-span-1 animate-pulse">
                <div className="py-1">
                  <div className="w-1/4 h-5 rounded bg-slate-200"></div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div className="h-8 bg-slate-200 rounded"></div>
                    <div className="h-8 bg-slate-200 rounded"></div>
                    <div className="h-8 bg-slate-200 rounded"></div>
                  </div>
                  <div className="w-1/4 h-5 rounded bg-slate-200 mt-3"></div>
                  <div className="grid gap-3 mt-3">
                    <div className="h-8 bg-slate-200 rounded"></div>
                  </div>
                  <div className="w-1/4 h-5 rounded bg-slate-200 mt-3"></div>
                  <div className="grid gap-3 mt-3">
                    <div className="h-8 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSkeleton;
