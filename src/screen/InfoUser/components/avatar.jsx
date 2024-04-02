import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import avatar from "../../../../assets/images/avatar.png"

const Avatar = () => {
    return (
        <View style={styles.headerPart}>
            <View style={[
                styles.flex1,
                {
                    display: 'flex',
                    flexDirection: "row",
                    justifyContent: "flex-start"
                }
            ]}>
                <View style={styles.leftPart}>
                    <Image source={avatar} />
                    <Text style={styles.nameUser}>PETER</Text>
                </View>
            </View>
            <View style={[
                styles.flex1,
                {
                    borderLeftWidth: 1,
                    borderLeftColor: "#2C2C2E",
                    padding: 20
                }
            ]}>
                <Text style={styles.textLabel}>Ngày tham gia: </Text>
                <Text style={styles.textDate}>18/01/2024</Text>
            </View>
        </View>
    )
}

export default Avatar
const styles = StyleSheet.create({
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flex1: {
        flex: 1
    },
    headerPart: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    leftPart: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",

    },
    nameUser: {
        color: "#FFFFFF",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 20,
        marginTop: 8
    },
    textLabel: {
        color: "#FFFFFF",
        fontFamily: "Roboto Regular",
        fontWeight: "400",
        fontSize: 12,
        marginBottom: 4
    },
    textDate: {
        color: "#FFFFFF",
        fontFamily: "Roboto Regular",
        fontWeight: "600",
        fontSize: 16,
    },
})