import React, { useState } from 'react'
import MainLayout from '../../../infrastructure/common/layouts/layout'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import InputPasswordCommon from '../../../infrastructure/common/components/input/input-password-common'
import authService from '../../../infrastructure/repositories/auth/service/auth.service'
import DialogNotificationCommon from '../../../infrastructure/common/components/dialog/dialogNotification'

const ChangePasswordScreen = ({ navigation }: any) => {
    const onGoBack = () => {
        navigation.goBack()
    }
    const [_data, _setData] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>(null);
    const isFocused = useIsFocused();
    const [isMessageSuccess, setIsMessageSuccess] = useState<boolean>(false);
    const [isMessageError, setIsMessageError] = useState<boolean>(false);

    const dataProfile = _data;
    const setDataProfile = (data: any) => {
        Object.assign(dataProfile, { ...data });
        _setData({ ...dataProfile });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });

        return allRequestOK;
    };

    const onChangePassword = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            try {
                await authService.changePassword(
                    {
                        // oldPassword: dataProfile.oldPassword,
                        password: dataProfile.newPassword,
                        // confirmPassword: dataProfile.confirmPassword,
                    },
                    () => { },
                    setIsMessageSuccess,
                    setIsMessageError,
                ).then((response) => {
                    if (response) {
                        onGoBack()
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <MainLayout
            title={"Đổi mật khẩu"}
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
                        Bạn có muốn mật khẩu?
                    </Text>
                    {/* <View
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
                    </View> */}
                </View>

                <View>
                    <KeyboardAvoidingView>
                        {/* <InputPasswordCommon
                            label={"Mật khẩu cũ"}
                            attribute={"oldPassword"}
                            dataAttribute={dataProfile.oldPassword}
                            isRequired={false}
                            setData={setDataProfile}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        /> */}
                        <InputPasswordCommon
                            label={"Mật khẩu mới"}
                            attribute={"newPassword"}
                            dataAttribute={dataProfile.newPassword}
                            isRequired={false}
                            setData={setDataProfile}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        {/* <InputPasswordCommon
                            label={"Xác nhận mật khẩu"}
                            attribute={"confirmPassword"}
                            dataAttribute={dataProfile.confirmPassword}
                            isRequired={false}
                            setData={setDataProfile}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        /> */}
                    </KeyboardAvoidingView>
                    <TouchableOpacity onPress={onGoBack}>
                        <Text style={styles.fontStyleBack}>
                            Trở lại màn hình đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View>
                <TouchableOpacity
                    onPress={onChangePassword}
                    style={styles.btnStyle}
                >
                    <Text style={styles.textBtnStyle}>Cập nhập</Text>
                </TouchableOpacity>
            </View>
            <DialogNotificationCommon
                visible={isMessageSuccess}
                onConfirm={() => setIsMessageSuccess(false)}
                message={"Cập nhật thành công"}
            />
            <DialogNotificationCommon
                visible={isMessageError}
                onConfirm={() => setIsMessageError(false)}
                message={"Cập nhật không thành công"}
            />
        </MainLayout>
    )
}

export default ChangePasswordScreen
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