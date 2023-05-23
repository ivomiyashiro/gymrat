import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['200', '400', '600', '900'],
})

export const metadata = {
  title: "Gymrat Official Nest: Men's & Women's Workout Apparel",
  description: "Shop a wide variety of men's and women's workout apparel, exclusively online.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
