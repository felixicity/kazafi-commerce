import type { NextConfig } from "next";

const nextConfig: NextConfig = {
      //   images: {
      //         // Add your Cloudinary domain here
      //         domains: ["res.cloudinary.com", "dzbspqyng.cloudinary.com"],
      //         // Optional: Use next-cloudinary as a loader for automatic optimization
      //         // loader: 'custom',
      //         // loaderFile: './cloudinary-loader.js', // Create this file if needed
      //   },
      images: {
            remotePatterns: [
                  {
                        protocol: "https",
                        hostname: "res.cloudinary.com",
                        // Optional: If you want to restrict to a specific Cloudinary account path:
                        // pathname: '/{my_username}/**',
                  },
            ],
      },
};

export default nextConfig;
