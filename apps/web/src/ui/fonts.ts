import { Space_Grotesk, Ubuntu_Sans } from 'next/font/google' 

export const grotestFont = Space_Grotesk({
  display: "swap",
  variable: "--font-grotesk",
  subsets: ['latin']
})

export const ubuntuFont = Ubuntu_Sans({
  display: 'swap',
  variable: '--font-ubuntu',
  subsets: ['latin']
})