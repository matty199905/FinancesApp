
import type { Metadata } from "next";
import ReduxProvider from "./providers";



export const metadata: Metadata = {
  title: "Finances",
  description: "Registra todos tus movimientos y comienza a ahorrar enserio.",
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <ReduxProvider>
      {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
