import { forwardRef } from 'react'
// @mui
import Link from '@mui/material/Link'
import Box, { BoxProps } from '@mui/material/Box'
// routes
import { RouterLink } from 'src/routes/components'

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          viewBox="0 0 250 250"
          xmlSpace="preserve"
        >
          <linearGradient
            id="SVGID_1_"
            gradientUnits="userSpaceOnUse"
            x1="147.989"
            y1="161.327"
            x2="241.624"
            y2="161.327"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M148.1 180.6c-.4-1.3.7-2.5 2-2.2 8.7 1.6 16.9 3.2 25.1 4.6 13.1 2.2 26.2 4.9 39.6 3.6 14-1.4 24.4-13.7 22.9-27.7-.4-3.9-1.3-7.8-2.5-11.5-2-6.3-4.2-12.6-6.1-19 5.8 12.3 11.6 24.5 12.5 38.4.8 12-3.7 19-15 23.2-13.1 4.8-26.9 4.8-40.6 4.3-10.5-.4-21-1.2-31.4-2.4-2.2-.3-3.6-.8-4.2-3.2-.7-2.8-1.5-5.3-2.3-8.1z"
            fill="url(#SVGID_1_)"
          />
          <linearGradient
            id="SVGID_00000081633819770701916570000018339417846402971791_"
            gradientUnits="userSpaceOnUse"
            x1="69.596"
            y1="55.544"
            x2="158.831"
            y2="55.544"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M69.6 43.8c7-10.1 15.1-19 25.9-25.3 8.6-5 16.6-4 24.1 2.1 10.2 8.2 16.7 19.3 23 30.4 5.7 10.1 10.5 20.6 15.3 31.1 1.4 3 1.2 5-1.3 7.2-2.3 2-4.2 4.4-6.3 6.6-1.8-1.3-1.8-3.3-2.3-5-5.3-16-10.7-32-18.3-47.2-2.9-5.9-6.2-11.6-10.8-16.3-8.4-8.4-17.3-9.2-27.2-2.6-7.1 4.8-19.2 20.2-21 19.7l-1.1-.7z"
            fill="url(#SVGID_00000081633819770701916570000018339417846402971791_)"
          />
          <linearGradient
            id="SVGID_00000102536717660703864900000017956957223154109356_"
            gradientUnits="userSpaceOnUse"
            x1="27.275"
            y1="180.285"
            x2="78.067"
            y2="180.285"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M78.1 134.4c-6.9 8-13.4 15.4-19.7 23.1-6.6 8-12.9 16.2-18.3 25.1-2.5 4-4.5 8.3-5.9 12.8-3.4 11.1-.1 19.3 10 25 6.3 3.6 13.2 5.4 20.2 6.9 1.5.3 3.1.8 4.5 1.7-12.1-1.3-24.1-2.7-34.1-10.4-6.6-5-8.4-12.1-7.1-20 2.3-13.8 9.2-25.7 16.3-37.4 5.6-9.4 12-18.3 18.5-27.2 1.5-2 2.7-2.9 5.2-2 3.1 1 6.4 1.5 10.4 2.4z"
            fill="url(#SVGID_00000102536717660703864900000017956957223154109356_)"
          />
          <linearGradient
            id="SVGID_00000072274956115351586240000002805381840298189451_"
            gradientUnits="userSpaceOnUse"
            x1="121.874"
            y1="208.403"
            x2="170.059"
            y2="208.403"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M157.1 215.6c-9.4-.6-19.7-1.4-30-1.9-2.8-.1-3.1-1.9-3.6-3.7-2.8-9.8-2.8-9.9 7.1-7.7 11.3 2.5 22.9 3.4 34.4 4.7 2.6.3 5.7 5.3 5 7.8-.4 1.2-1.4.9-2.2 1-1.7 0-3.4-.1-5-.1-1.6-.1-3.2-.1-5.7-.1z"
            fill="url(#SVGID_00000072274956115351586240000002805381840298189451_)"
          />
          <linearGradient
            id="SVGID_00000136375508374008336320000014004075145822542479_"
            gradientUnits="userSpaceOnUse"
            x1="165.477"
            y1="83.095"
            x2="191.518"
            y2="83.095"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M182.6 108c-4.9-15.1-10.4-28.9-16.6-42.4-2-4.2 2.2-5.5 4.1-6.9 2.3-1.7 2.6 1.8 3.2 3 6 11.3 11.7 22.7 17.6 34.1.9 1.8.8 2.9-.7 4.3-2.5 2.3-4.7 4.9-7.6 7.9z"
            fill="url(#SVGID_00000136375508374008336320000014004075145822542479_)"
          />
          <linearGradient
            id="SVGID_00000068657382361795283830000007149382687923222156_"
            gradientUnits="userSpaceOnUse"
            x1="34.393"
            y1="117.733"
            x2="71.75"
            y2="117.733"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M71.8 100.6c-10.5 11.6-19.6 23.4-28.2 35.5-2.5 3.5-5.9.8-8.2-.2-2.5-1.1.4-3.1 1.1-4.3 6.3-11 13.5-21.3 20.5-31.8 1.3-1.9 2.4-2.7 4.8-1.9 2.9 1.1 6.1 1.7 10 2.7z"
            fill="url(#SVGID_00000068657382361795283830000007149382687923222156_)"
          />
          <linearGradient
            id="SVGID_00000135659061226462255300000004017484961842732445_"
            gradientUnits="userSpaceOnUse"
            x1="85.606"
            y1="96.185"
            x2="119.598"
            y2="96.185"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M85.6 105.2c6-7.2 11.7-13.9 17.3-20.6.8-1 1.8-.9 2.9-.6 4.4 1.2 8.7 2.5 13.8 3.9-6.1 6.9-11.8 13.6-17.7 20.1-1.1 1.2-2.6.5-3.9.3-3.8-1-7.6-2-12.4-3.1z"
            fill="url(#SVGID_00000135659061226462255300000004017484961842732445_)"
          />
          <linearGradient
            id="SVGID_00000170972025182239147950000017223810679952415133_"
            gradientUnits="userSpaceOnUse"
            x1="85.969"
            y1="175.511"
            x2="117.886"
            y2="175.511"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M86 165.2c8.8 1.7 17.1 3.4 25.4 5 1.3.3 2.2.9 2.6 2.2 1.2 4.3 2.5 8.6 3.9 13.4-8.9-1.5-17.3-2.9-25.6-4.4-1.5-.3-2.4-1.1-2.7-2.7-1.2-4.3-2.3-8.6-3.6-13.5z"
            fill="url(#SVGID_00000170972025182239147950000017223810679952415133_)"
          />
          <linearGradient
            id="SVGID_00000152226030048577424690000007748536439517984436_"
            gradientUnits="userSpaceOnUse"
            x1="161.001"
            y1="136.758"
            x2="180.795"
            y2="136.758"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M171.6 117.5c3.1 8.7 6 16.8 9 25 .4 1.2.3 2-.6 2.9-3.3 3.3-6.5 6.7-10.3 10.6-3-8.9-5.7-16.9-8.5-24.9-.6-1.6.1-2.6 1.1-3.6 2.9-3.1 5.8-6.3 9.3-10z"
            fill="url(#SVGID_00000152226030048577424690000007748536439517984436_)"
          />
          <linearGradient
            id="SVGID_00000135691734039194032480000003717914652986211254_"
            gradientUnits="userSpaceOnUse"
            x1="8.377"
            y1="138.979"
            x2="31.746"
            y2="138.979"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M8.7 167.1c-1.3-9.7 1.1-18.7 3.9-27.7 2.7-9 6.3-17.7 10.1-26.4 1-2.3 7.3-3 8.7-.9 1 1.4-.5 2.5-1.1 3.6-7.3 14.4-14 29-19.4 44.2-.7 2.4-1.4 4.8-2.2 7.2z"
            fill="url(#SVGID_00000135691734039194032480000003717914652986211254_)"
          />
          <linearGradient
            id="SVGID_00000036252433718789732200000016583553819389579693_"
            gradientUnits="userSpaceOnUse"
            x1="156.227"
            y1="43.352"
            x2="186.185"
            y2="43.352"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M156.2 19.6c2.8.2 4.4 1.7 6.1 2.9 14.1 10 24.5 23.5 34.5 37.4 2.6 3.6-2 4.8-3.6 6.6-1.7 1.9-2.3-1-2.9-2-10.3-15.5-20.7-31-34.1-44.9z"
            fill="url(#SVGID_00000036252433718789732200000016583553819389579693_)"
          />
          <linearGradient
            id="SVGID_00000056401351896868803490000000582494813691354037_"
            gradientUnits="userSpaceOnUse"
            x1="150.788"
            y1="229.88"
            x2="208.566"
            y2="229.88"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M208.6 223c-3.5 2.7-7 4.1-10.5 5.3-14 4.9-28.5 7-43.1 8.7-1.9.2-3.7-1.2-4-3.1-.9-6.9 2-5.2 3.8-5.3 15.7-.4 31.2-2.1 46.6-4.8 2.1-.5 4.2-1.4 7.2-.8z"
            fill="url(#SVGID_00000056401351896868803490000000582494813691354037_)"
          />
          <linearGradient
            id="SVGID_00000172407272636120823270000017082602600535402167_"
            gradientUnits="userSpaceOnUse"
            x1="15.029"
            y1="171.772"
            x2="38.002"
            y2="171.772"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M16.9 201.3c-3.5-11.1-1.6-21.8 1.7-32.3 2.6-8.6 6.5-16.7 10.6-24.7 1.2-2.3 6.9-2.8 8.5-.7 1 1.3-.4 2.2-1 3.1-5 8.2-9.5 16.6-13.3 25.5-4 9.3-6.3 18.9-6.5 29.1z"
            fill="url(#SVGID_00000172407272636120823270000017082602600535402167_)"
          />
          <linearGradient
            id="SVGID_00000151526134946980489890000000408301806695487888_"
            gradientUnits="userSpaceOnUse"
            x1="175.294"
            y1="207.308"
            x2="232.859"
            y2="207.308"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M232.2 199.2c.5-.1.8.5.5.8-2.4 3.1-5.4 4.7-8.4 6.1-14.2 6.9-29.6 8.8-45.2 9.2-4.4.1-3.3-3.8-3.8-6-.6-3 2.2-1.6 3.4-1.5 15.1.2 30.1-.3 44.6-5.1 3-.8 5.5-2.8 8.9-3.5z"
            fill="url(#SVGID_00000151526134946980489890000000408301806695487888_)"
          />
          <linearGradient
            id="SVGID_00000172411315491246840250000017061649441627341466_"
            gradientUnits="userSpaceOnUse"
            x1="123.817"
            y1="33.694"
            x2="167.158"
            y2="33.694"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M123.8 10.7c5.7 0 10.2 2.9 14.4 6.1 11.8 8.8 20.4 20.4 28.1 32.7 2.5 4-1.7 5.1-3.4 6.6-2.1 1.8-2.3-1.3-3-2.4-5-8.7-9.9-17.5-16.3-25.3-5.5-7-11.7-13.4-19.8-17.7z"
            fill="url(#SVGID_00000172411315491246840250000017061649441627341466_)"
          />
          <linearGradient
            id="SVGID_00000062183706213636789040000004425636758492327865_"
            gradientUnits="userSpaceOnUse"
            x1="120.634"
            y1="181.247"
            x2="144.072"
            y2="181.247"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M120.6 172.4c6.5.4 12.3 2.2 18.2 3.3 1 .2 1.4 1.1 1.7 2 1.2 4.1 2.3 8.1 3.6 12.4-5.9.1-11.3-1.6-16.8-2.3-1.5-.2-2.5-.9-2.9-2.4-1.2-4.2-2.4-8.4-3.8-13z"
            fill="url(#SVGID_00000062183706213636789040000004425636758492327865_)"
          />
          <linearGradient
            id="SVGID_00000023971709051187880000000011504505146849935536_"
            gradientUnits="userSpaceOnUse"
            x1="69.572"
            y1="120.084"
            x2="96.138"
            y2="120.084"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M96.1 114.7c-4 4.5-7.9 8.9-11.8 13.4-1 1.2-2.1.9-3.3.6-2.8-.7-5.6-1.5-8.4-1.9-4.1-.5-3.6-2.1-1.4-4.5.7-.8 1.3-1.7 2-2.5 9-10.4 9-10.4 22.9-5.1z"
            fill="url(#SVGID_00000023971709051187880000000011504505146849935536_)"
          />
          <linearGradient
            id="SVGID_00000062158044810627117360000001039296673046536608_"
            gradientUnits="userSpaceOnUse"
            x1="152.303"
            y1="107.64"
            x2="168.855"
            y2="107.64"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M158.3 122.5c-2.1-6.1-3.9-11.7-5.8-17.3-.5-1.4.1-2.3 1-3.2 2.8-2.9 5.7-5.9 8.7-9.1 2.9 5.4 4.3 11 6.4 16.3.6 1.5 0 2.3-.9 3.2-3 3.1-6 6.3-9.4 10.1z"
            fill="url(#SVGID_00000062158044810627117360000001039296673046536608_)"
          />
          <linearGradient
            id="SVGID_00000031197869486094777940000004608364659600925617_"
            gradientUnits="userSpaceOnUse"
            x1="27.359"
            y1="93.473"
            x2="47.849"
            y2="93.473"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M33.8 106c-1.7-.4-3-.9-4.4-1.1-2.1-.3-2.5-1.1-1.5-3.1 3.2-6.4 6.3-12.9 9.4-19.3 1.7-3.5 4.3-1.1 6.3-.7 5.2 1.1 5.1 1.2 2.5 5.7l-9.3 16.2c-.8 1.5-1.3 3.1-3 2.3z"
            fill="url(#SVGID_00000031197869486094777940000004608364659600925617_)"
          />
          <linearGradient
            id="SVGID_00000062895679739775961730000015183301886661252542_"
            gradientUnits="userSpaceOnUse"
            x1="196.386"
            y1="81.496"
            x2="216.316"
            y2="81.496"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M216.3 88.3c0 1-6.1 7.2-6.9 7.2-1 .1-1.2-.8-1.6-1.4-3.7-6.3-7.5-12.5-11-19-2-3.8 2.2-5.2 4-7.1 2-2 2.6 1 3.3 2.1 3.7 5.2 7.2 10.6 10.7 15.9.6.9 1.1 1.7 1.5 2.3z"
            fill="url(#SVGID_00000062895679739775961730000015183301886661252542_)"
          />
          <linearGradient
            id="SVGID_00000008118131175946204290000002849552504158956946_"
            gradientUnits="userSpaceOnUse"
            x1="118.209"
            y1="234.223"
            x2="146.239"
            y2="234.223"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0" stopColor="#03f9ca" />
            <stop offset=".156" stopColor="#18e1d0" />
            <stop offset=".486" stopColor="#4da4e1" />
            <stop offset=".959" stopColor="#a143fb" />
            <stop offset="1" stopColor="#a93afd" />
          </linearGradient>
          <path
            d="M131.4 229.1h7.8c4.7-.1 7 2.3 7.1 6.9 0 1.9-1.2 1.9-2.4 2-7.2.5-14.3.8-21.5 1.3-3.1.2-2.7-2.4-3.2-4-1.8-6-1.7-6.1 4.4-6.1 2.6 0 5.2 0 7.8-.1 0 .1 0 .1 0 0z"
            fill="url(#SVGID_00000008118131175946204290000002849552504158956946_)"
          />
        </svg>
      </Box>
    )

    if (disabledLink) {
      return logo
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    )
  }
)

export default Logo
