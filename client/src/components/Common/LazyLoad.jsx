// components/LazyLoad.js
import React, { lazy, Suspense } from "react";

const LazyLoad = (importFunc, fallback = <div>Loading...</div>) => {
  const LazyComponent = lazy(importFunc);

  return (
    <Suspense fallback={fallback}>
      <LazyComponent />
    </Suspense>
  );
};

export default LazyLoad;
