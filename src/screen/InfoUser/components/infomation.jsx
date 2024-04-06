import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Constants from '../../../core/common/constants'
import navigateToIcon from "../../../../assets/images/arrow-ios-back-outline.png"
const Infomation = (props) => {
    const { navigation } = props
    const navigateEditProfile = (value) => {
        navigation.navigate(
            value
        )
    }
    return (
        <View style={styles.content}>
            <View>
                {
                    Constants.InfoUser.List.map((it, index) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity onPress={() => navigateEditProfile(it.value)} style={styles.touchContent}>
                                    <Text style={styles.labelTouch}>{it.label}</Text>
                                    <Image source={navigateToIcon} style={{
                                        transform: [{ scaleX: -1 }],
                                    }} />
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default Infomation

const styles = StyleSheet.create({
    content: {
        paddingVertical: 24,
    },
    touchContent: {
        borderBottomWidth: 1,
        borderColor: "#2C2C2E",
        paddingVertical: 16,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    labelTouch: {
        color: "#FFFFFF",
        fontFamily: "Roboto Regular",
        fontSize: 15,
    },
    logoutTouch: {
        color: "#FF2424",
        fontFamily: "Roboto Regular",
        fontSize: 15,
    },

})