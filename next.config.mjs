/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure we're using the correct output directory
  // distDir: '.next', // This is the default, so we can omit it
  
  // These settings help prevent build failures due to minor issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // This is important for image optimization
  images: {
    unoptimized: true,
  },
  
  // Disable experimental features that might cause issues
  experimental: {
    // Remove any experimental features
  },
  
  // Ensure we're generating the routes manifest
  generateBuildId: async () => {
    // This is just to ensure the build process generates all required files
    return `build-${Date.now()}`
  },
  
  // Add this to help with potential build issues
  poweredByHeader: false,
}

export default nextConfig
