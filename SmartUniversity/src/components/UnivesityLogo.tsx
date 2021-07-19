import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"

function UniversityLogoComponent(props) {
    return (
        <Svg
          width={108}
          height={100}
          viewBox="0 0 108 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          {...props}
        >
          <Path fill="url(#prefix__pattern0)" d="M0 0h107.317v100H0z" />
          <Path fill="url(#prefix__pattern1)" d="M0 0h107.317v100H0z" />
          <Defs>
            <Pattern
              id="prefix__pattern0"
              patternContentUnits="objectBoundingBox"
              width={1}
              height={1}
            >
              <Use xlinkHref="#prefix__image0" transform="scale(.00758 .00813)" />
            </Pattern>
            <Pattern
              id="prefix__pattern1"
              patternContentUnits="objectBoundingBox"
              width={1}
              height={1}
            >
              <Use xlinkHref="#prefix__image0" transform="scale(.00758 .00813)" />
            </Pattern>
            <Image
              id="prefix__image0"
              width={132}
              height={123}
              xlinkHref="data:image/png;base64,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"
            />
          </Defs>
        </Svg>
      )
    }
export default UniversityLogoComponent