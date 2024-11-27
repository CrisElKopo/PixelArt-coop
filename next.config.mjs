/** @type {import('next').NextConfig} */
export default {
    async headers() {
      return [
        {
          source: "/:path*", // Solo afecta las rutas de tu Next.js
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: 'http://localhost:3001', // Permite solicitudes del cliente (si usas fetch, axios, etc.)
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET,POST,OPTIONS',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
            {
              key: 'Access-Control-Allow-Credentials',
              value: 'true',
            },
          ],
        },
      ];
    },
  };
  