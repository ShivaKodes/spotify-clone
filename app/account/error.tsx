"use client";

import Box from "@/components/Box";

const Error = ({error}:any) => {
  console.log("coming form error component",error)
  return (
    <Box className="h-full flex items-center justify-center">
      <div className="text-neutral-400">Error!</div>
    </Box>
  );
};

export default Error;
