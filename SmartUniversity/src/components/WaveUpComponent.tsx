import * as React from "react"
import Svg, { Path } from "react-native-svg"

function WaveUpComponent(props) {
  return (
    <Svg viewBox="0 0 1440 320" {...props}>
      <Path
        fill="#09f"
        d="M0 192l48 16c48 16 144 48 240 21.3C384 203 480 117 576 122.7 672 128 768 224 864 240s192-48 288-80 192-32 240-32h48V0H0z"
      />
    </Svg>
  )
}

export default WaveUpComponent
