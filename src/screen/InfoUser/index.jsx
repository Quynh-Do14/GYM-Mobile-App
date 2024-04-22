import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import MainLayout from '../../infrastructure/common/layouts/layout'
import avatar from "../../../assets/images/avatar.png"
import Infomation from './components/infomation'
import Avatar from './components/avatar'
import Constants from '../../core/common/constants'
import authService from '../../infrastructure/repositories/auth/service/auth.service'
const InfoUserScreen = ({ navigation }) => {

    const onLogOutAsync = async () => {
        try {
            await authService.logout(
                () => { }
            ).then(() => {
                navigation.navigate(
                    Constants.Navigator.Auth.LoginScreen.value
                )
            });
        } catch (error) {
            console.error(error);
        }
    }

    const onLogOut = () => {
        Alert.alert('Đăng xuất', 'Bạn muốn đăng xuất?', [
            {
                text: 'Hủy',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Đăng xuất', onPress: () => {
                    onLogOutAsync()
                },
            }
        ]);
    }

    return (
        <MainLayout
            title={"Hồ sơ cá nhân"}
            isBackButton={true}
        >
            <View style={styles.content}>
                <Avatar />
                <Infomation
                    navigation={navigation}
                />

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
    content: {
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