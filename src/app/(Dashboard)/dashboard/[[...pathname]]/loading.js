import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <div className="mt-40 min-h-screen">
      <Image
        src="/loading.gif"
        alt="Loading Image"
        width={30}
        height={30}
        className="mx-auto"
      />
    </div>
  );
};

export default loading;
