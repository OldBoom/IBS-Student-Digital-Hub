// Root layout — wraps every page in the application.
//
// Responsibilities:
// - Set <html> and <body> tags with lang attribute.
// - Load global fonts (e.g. Inter via next/font).
// - Import globals.css (TailwindCSS base styles).
// - Wrap children with any global providers if needed later.

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
