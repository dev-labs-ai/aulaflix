import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      // O cadastro passou a fazer parte de /entrar, que pergunta o e-mail primeiro.
      { source: "/cadastrar", destination: "/entrar", permanent: false },
      // Minhas compras e Configurações viraram abas de /conta.
      { source: "/compras", destination: "/conta/compras", permanent: false },
      { source: "/configuracoes", destination: "/conta", permanent: false },
    ];
  },
};

export default nextConfig;
