// scrollbar
import 'simplebar-react/dist/simplebar.min.css'

// image
import 'react-lazy-load-image-component/src/effects/blur.css'
import './index.css'

// ----------------------------------------------------------------------

import ThemeProvider from 'src/theme'
import SnackbarProvider from 'src/components/snackbar'
import { primaryFont } from 'src/theme/typography'
import ProgressBar from 'src/components/progress-bar'
import { MotionLazy } from 'src/components/animate/motion-lazy'
import { SettingsProvider, SettingsDrawer } from 'src/components/settings'
import { AuthProvider, AuthConsumer } from 'src/auth/context/jwt'
import { ApolloWrapper } from 'src/lib/apollo-provider'

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Administrador de Proyectos',
  description:
    'Administrador de Proyectos',
  keywords: 'Administrador de Proyectos',
  themeColor: '#000000',
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={primaryFont.className} translate="no">
      <meta name="google" content="notranslate" />
      <meta name="robots" content="notranslate" />
      <body>
        <ApolloWrapper>
          <AuthProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeContrast: 'default', // 'default' | 'bold'
                themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <SnackbarProvider>
                    <SettingsDrawer />
                    <ProgressBar />
                    <AuthConsumer>{children}</AuthConsumer>
                  </SnackbarProvider>
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}
