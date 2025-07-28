import './globals.css'

export const metadata = {
  title: 'AI Travel Planner Pro',
  description: 'Plan your perfect trip with AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
