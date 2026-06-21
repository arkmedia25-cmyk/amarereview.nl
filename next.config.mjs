/** @type {import('next').NextConfig} */
import nextMDX from '@next/mdx'
const withMDX = nextMDX({
  extension: /\.mdx?$/,
})

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: { unoptimized: true },
}

export default withMDX(nextConfig)
