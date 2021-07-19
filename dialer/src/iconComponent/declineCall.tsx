import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgDeclineCall(props) {
  return (
    <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.997 12c.927 0 1.812.118 2.43.324.27.09.464.189.569.276v.901c0 .254.001.38.01.543.054 1.14.344 1.911 1.396 1.954 2.015.335 3.36.502 4.092.502 1.456 0 2.5-1.31 2.5-2.5 0-.135 0-.244.003-.49l.003-.505c0-.194-.002-.366-.006-.532C22.994 8.777 17.969 6 11.997 6 6.027 5.999 1 8.776 1 12.5V14c0 1.197 1.042 2.5 2.5 2.5.732 0 2.08-.168 4.098-.503.767-.044 1.167-.601 1.317-1.32.07-.34.083-.62.083-1.177v-.9c.105-.088.3-.187.57-.276.617-.206 1.502-.324 2.429-.324zm-4.999.5v1c0 .26-.003.438-.014.571-1.751.286-2.928.429-3.484.429-.243 0-.5-.322-.5-.5v-1.5c0-2.3 3.984-4.501 8.997-4.5 5.014.001 8.997 2.201 8.997 4.5.004.173.006.328.006.505 0 .134 0 .241-.003.486l-.003.509c0 .172-.261.5-.5.5-.556 0-1.732-.143-3.483-.428a8.612 8.612 0 01-.015-.572v-1c0-1.766-2.205-2.5-4.999-2.5-2.792 0-4.999.734-4.999 2.5z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default SvgDeclineCall