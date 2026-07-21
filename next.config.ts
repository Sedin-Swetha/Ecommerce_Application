// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//       {
//         protocol: "https",
//         hostname: "encrypted-tbn0.gstatic.com",
//       },
//       {
//         protocol: "https",
//         hostname: "encrypted-tbn1.gstatic.com",
//       },
//       {
//         protocol: "https",
//         hostname: "encrypted-tbn2.gstatic.com",
//       },
//     ],
//   },
// };

// export default nextConfig;
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", 
      },
    ],
  },
};

export default nextConfig;