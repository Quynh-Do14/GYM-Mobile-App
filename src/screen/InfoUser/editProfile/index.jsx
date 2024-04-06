import React from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import avatar from "../../../../assets/images/avatar.png"
import MainLayout from '../../../infrastructure/common/layouts/layout'

const EditProfile = ({ navigation }) => {
    const onGoBack = () => {
        navigation.goBack()
    }
    return (
        <MainLayout
            title={"Chỉnh sửa hồ sơ"}
            isBackButton={true}
            onGoBack={onGoBack}
        >
            <View style={styles.content}>
                <KeyboardAvoidingView>
                    <ScrollView>
                        <View>
                            <View style={styles.avatarChange}>
                                <Image source={avatar} />
                            </View>
                            <View>
                                <View>
                                    <Text style={styles.labelStyle}>
                                        Tên đăng nhập
                                    </Text>
                                    <TextInput
                                        placeholder='Tên đăng nhập'
                                        placeholderTextColor={"#ffffff"}
                                        style={[
                                            { position: "relative" },
                                            styles.fontStyle,
                                            styles.inputStyle
                                        ]} />
                                </View>

                                <View>
                                    <Text style={styles.labelStyle}>
                                        Email
                                    </Text>
                                    <TextInput
                                        placeholder='Email'
                                        placeholderTextColor={"#ffffff"}
                                        style={[
                                            { position: "relative" },
                                            styles.fontStyle,
                                            styles.inputStyle
                                        ]} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
            <View>
                <TouchableOpacity style={styles.btnStyle}>
                    <Text style={styles.textBtnStyle}>Cập nhập</Text>
                </TouchableOpacity>
            </View>

        </MainLayout >

    )
}

export default EditProfile
const styles = StyleSheet.create({
    content: {
        flex: 1
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
    avatarChange: {
        paddingVertical: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#2C2C2E",
        marginBottom: 12,

    },
    fontStyle: {
        color: "#FFFFFF",
        fontFamily: "Roboto Regular",
        fontWeight: "900",
    },

    labelStyle: {
        color: "#D0FD3E",
        fontFamily: "Roboto Regular",
        fontWeight: "600",
        fontSize: 11,
        position: "absolute",
        top: -4
    },

    inputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: "#2C2C2E",
        marginBottom: 12
    },
    btnStyle: {
        backgroundColor: "#D0FD3E",
        paddingVertical: 16,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
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