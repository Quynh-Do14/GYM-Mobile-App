import React from 'react'
import MainLayout from '../../../infrastructure/common/layouts/layout'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const ForgotPasswordScreen = ({ navigation }: any) => {
    const onGoBack = () => {
        navigation.goBack()
    }
    return (
        <MainLayout
            title={"Quên mật khẩu"}
            isBackButton={true}
            onGoBack={onGoBack}
        >
            <View style={styles.content}>
                <View>
                    <Text style={[
                        styles.fontStyle,
                        {
                            fontSize: 24,
                            marginBottom: 20
                        }
                    ]}>
                        Bạn đã quên mật khẩu?
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 4
                        }}
                    >
                        <Text style={styles.fontStyle}>
                            Vui lòng nhập Email
                        </Text>
                        <Text style={styles.fontStyle}>
                            để lấy lại thông tin mật khẩu
                        </Text>
                    </View>
                </View>

                <View>
                    <KeyboardAvoidingView>
                        <View>
                            <TextInput
                                placeholder='Email'
                                placeholderTextColor={"#ffffff"}
                                style={[
                                    styles.fontStyle,
                                    styles.inputStyle
                                ]} />
                        </View>
                    </KeyboardAvoidingView>
                    <TouchableOpacity onPress={onGoBack}>
                        <Text style={styles.fontStyleBack}>
                            Trở lại màn hình đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View>
                <TouchableOpacity style={styles.btnStyle}>
                    <Text style={styles.textBtnStyle}>Cập nhập</Text>
                </TouchableOpacity>
            </View>
        </MainLayout>
    )
}

export default ForgotPasswordScreen
const styles = StyleSheet.create({
    content: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 32
    },
    fontStyle: {
        color: "#FFFFFF",
        fontFamily: "Roboto Regular",
        fontWeight: "900",
    },
    fontStyleBack: {
        color: "#D0FD3E",
        fontFamily: "Roboto Regular",
        fontWeight: "900",
        fontSize: 13,
        marginTop: 28,
        textAlign: "center"
    },
    textBtnStyle: {
        color: "#000000",
        fontFamily: "Roboto Regular",
        fontSize: 16,
        fontWeight: "900",
    },

    inputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: "#2C2C2E",
    },
    btnStyle: {
        backgroundColor: "#D0FD3E",
        paddingVertical: 16,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
})