import React, { useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MainLayout from '../../../infrastructure/common/layouts/layout'
import { useRecoilValue } from 'recoil'
import { ProfileState } from '../../../core/atoms/profile/profileState'
import InputTextCommon from '../../../infrastructure/common/components/input/input-text-common'
import { useNavigation } from '@react-navigation/native'

const EditProfile = () => {
    const dataProfileRecoil = useRecoilValue(ProfileState);
    const navigation = useNavigation<any>();

    const [_data, _setData] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState();

    const dataProfile = _data;
    const setDataProfile = (data: any) => {
        Object.assign(dataProfile, { ...data });
        _setData({ ...dataProfile });
    };

    useEffect(() => {
        if (dataProfile) {
            setDataProfile({
                avatar: dataProfileRecoil.data.avatar,
                name: dataProfileRecoil.data.name,
                username: dataProfileRecoil.data.username,
            });
        };
    }, [dataProfileRecoil]);

    const onGoBack = () => {
        navigation.goBack();
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
                                <Image
                                    source={{ uri: dataProfileRecoil?.data?.avatar } || require("../../../../assets/images/avatar.png")}
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
    textBtnStyle: {
        color: "#000000",
        fontFamily: "Roboto Regular",
        fontSize: 16,
        fontWeight: "900",
    },
})