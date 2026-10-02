import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      // O cadastro passou a fazer parte de /entrar, que pergunta o e-mail primeiro.
      { source: "/cadastrar", destination: "/entrar", permanent: false },
    ];
  },
};

export default nextConfig;
