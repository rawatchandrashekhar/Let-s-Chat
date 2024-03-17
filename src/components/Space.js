import React from 'react'
import { View } from 'react-native'

const Space = ({ mV, mH }) => {
    return (
        <View style={{ marginVertical: mV, marginHorizontal: mH }} />
    )
}

Space.defaultProps = {
    mV: 0,
    mH: 0
}

export default Space