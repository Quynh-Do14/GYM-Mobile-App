import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MainLayout from '../../../infrastructure/common/layouts/layout'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ProfileState } from '../../../core/atoms/profile/profileState'
import InputTextCommon from '../../../infrastructure/common/components/input/input-text-common'
import { useNavigation } from '@react-navigation/native'
import authService from '../../../infrastructure/repositories/auth/service/auth.service'
import DialogNotificationCommon from '../../../infrastructure/common/components/dialog/dialogNotification'

const EditProfile = () => {
    const navigation = useNavigation<any>();

    const [_data, _setData] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>(null);
    const [isMessageSuccess, setIsMessageSuccess] = useState<boolean>(false);
    const [isMessageError, setIsMessageError] = useState<boolean>(false);
    const [detailUser, setdetailUser] = useState<any>({});

    const dataProfile = _data;
    const setDataProfile = (data: any) => {
        Object.assign(dataProfile, { ...data });
        _setData({ ...dataProfile });
    };
    const [, setDataPosition] = useRecoilState(ProfileState);

    useEffect(() => {
        if (dataProfile) {
            setDataProfile({
                avatar: detailUser.avatar,
                name: detailUser.name,
                username: detailUser.username,
                email: detailUser.email,

            });
        };
    }, [detailUser]);

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

    const onGoBack = () => {
        navigation.goBack();
    }

    const getProfileUser = async () => {
        try {
            await authService.profile(
                () => { }
            ).then((response) => {
                if (response) {
                    setDataPosition({
                        data: response
                    })
                    setdetailUser(response)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getProfileUser().then(() => { })
    }, [])

    const onUpdateProfile = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            try {
                await authService.updateProfile(
                    {
                        username: dataProfile.username,
                        name: dataProfile.name,
                        email: dataProfile.email,
                    },
                    () => { },
                    setIsMessageSuccess,
                    setIsMessageError,
                ).then((response) => {
                    if (response) {
                        getProfileUser().then(() => { })
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    }


    return (
        <MainLayout
            title={"Chỉnh sửa hồ sơ"}
            isBackButton={true}
            onGoBack={onGoBack}
        >
            <View style={styles.content}>
                <ScrollView>
                    <View>
                        <View style={styles.avatarChange}>
                            <Image
                                source={dataProfile?.avatar ? { uri: dataProfile?.avatar } : require("../../../../assets/images/avatar.png")}
                                resizeMode={"contain"}
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 50
                                }}
                            />
                        </View>
                        <View>
                            <InputTextCommon
                                label={"Tên người dùng"}
                                attribute={"name"}
                                dataAttribute={dataProfile.name}
                                isRequired={false}
                                setData={setDataProfile}
                                editable={true}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />

                            <InputTextCommon
                                label={"Tên đăng nhập"}
                                attribute={"username"}
                                dataAttribute={dataProfile.username}
                                isRequired={false}
                                setData={setDataProfile}
                                editable={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />

                            <InputTextCommon
                                label={"Email"}
                                attribute={"emai"}
                                dataAttribute={dataProfile.email}
                                isRequired={false}
                                setData={setDataProfile}
                                editable={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={onUpdateProfile}
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
    textBtnStyle: {
        color: "#000000",
        fontFamily: "Roboto Regular",
        fontSize: 16,
        fontWeight: "900",
    },
})