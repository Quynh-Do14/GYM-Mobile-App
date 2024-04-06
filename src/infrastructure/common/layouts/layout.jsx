import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import backArrow from "../../../../assets/images/arrow-ios-back-outline.png"
import { PropTypes } from "prop-types";

const MainLayout = (props) => {
    const {
        title,
        isBackButton = false,
        onGoBack
    } = props;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.flex1} >
                    <TouchableOpacity
                        onPress={onGoBack}
                    >
                        {isBackButton &&
                            <View  >
                                <Image source={backArrow} />
                            </View>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.flex2}>
                    <Text style={styles.textTitle}>{title}</Text>
                </View>
                <View style={styles.flex1}>
                </View>
            </View>
            {props.children}
        </View >
    )
}
MainLayout.propTypes = {
    title: PropTypes.string,
    isBackButton: PropTypes.bool,
    onGoBack: PropTypes.func
}
export default MainLayout

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1C1C1E",
        paddingHorizontal: 24,
        paddingVertical: 20,
        flex: 1
    },
    content: {
        flex: 1
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20
    },
    flex1: {
        flex: 1
    },
    flex2: {
        flex: 2
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    textTitle: {
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 20,
    },
    btnStyle: {
        backgroundColor: "#D0FD3E",
        paddingVertical: 16,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    textBtnStyle: {
        color: "#000000",
        fontFamily: "Roboto Regular",
        fontSize: 16,
        fontWeight: "900",
    }
})