import * as React from "react"
import Svg, { Path } from "react-native-svg"

function WaveDownComponent(props) {
  return (
    <Svg  viewBox="0 0 1440 320" {...props}>
      <Path
        fill="#09f"
        d="M0 288l48-16c48-16 144-48 240-69.3 96-21.7 192-31.7 288-21.4C672 192 768 224 864 240s192 16 288 0 192-48 240-64l48-16v160H0z"
      />
    </Svg>
  )
}

export default WaveDownComponent