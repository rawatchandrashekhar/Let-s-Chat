import moment from 'moment';
import React from 'react'
import { Text, View } from 'react-native'
import Space from '../../components/Space';

const RenderItem = ({ item, sender }) => {

    const { message, sendTime } = item;

    return (
        <View style={{ position: "relative", alignItems: sender ? "flex-end" : "flex-start", marginVertical: 2 }}>
            <View style={{ marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 5, zIndex: 2, backgroundColor: sender ? "#E01226" : "#fff", borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
                <Text style={{ fontSize: 17, color:sender? "#fff":"#000" }}>{message}</Text>
                <Space mV={1} />
                <Text style={{ color:sender? "#fff":"#000", fontSize: 10 }}>{moment(sendTime).format("D-MM-YYYY h:mm a")}</Text>
            </View>
            <View style={{
                width: 0,
                height: 0,
                borderRightWidth: sender ? 0 : 25,
                borderTopWidth: 25,
                borderLeftWidth: 25,
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                borderTopColor: sender ? "#E01226" : "#fff",
                position: "absolute", bottom: 0, transform: [{ rotate: "180deg" }]
            }} />
        </View>
    )
}

export default RenderItem