import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MainLayout from '../../infrastructure/common/layouts/layout'
import avatar from "../../../assets/images/avatar.png"
import Infomation from './components/infomation'
import Avatar from './components/avatar'
import Constants from '../../core/common/constants'
const InfoUserScreen = ({ navigation }) => {
    const onLogOut = () => {
        navigation.navigate(
            Constants.Navigator.LoginScreen.value
        )
    }
    return (
        <MainLayout
            title={"Hồ sơ cá nhân"}
            isBackButton={true}
        >
            <View>
                <Avatar />
                <Infomation />

            </View>
            <View>
                <TouchableOpacity onPress={onLogOut} style={styles.touchContent}>
                    <Text style={styles.logoutTouch}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </MainLayout>
    )
}

export default InfoUserScreen
const styles = StyleSheet.create({
    flex1: {
        flex: 1
    },
    touchContent: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#2C2C2E",
        paddingVertical: 16,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    logoutTouch: {
        color: "#FF2424",
        fontFamily: "Roboto Regular",
        fontSize: 15,
    },
})