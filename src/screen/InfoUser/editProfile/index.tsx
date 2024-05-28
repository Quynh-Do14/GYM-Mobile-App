import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MainLayout from '../../../infrastructure/common/layouts/layout'
import { useRecoilState } from 'recoil'
import { ProfileState } from '../../../core/atoms/profile/profileState'
import InputTextCommon from '../../../infrastructure/common/components/input/input-text-common'
import { useNavigation } from '@react-navigation/native'
import authService from '../../../infrastructure/repositories/auth/service/auth.service'
import DialogNotificationCommon from '../../../infrastructure/common/components/dialog/dialogNotification'
import LoadingFullScreen from '../../../infrastructure/common/components/controls/loading';
import SelectCommon from '../../../infrastructure/common/components/input/select-common'
import Constants from '../../../core/common/constants'

const EditProfile = () => {
    const [_data, _setData] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>(null);
    const [isMessageSuccess, setIsMessageSuccess] = useState<boolean>(false);
    const [isMessageError, setIsMessageError] = useState<boolean>(false);
    const [detailUser, setDetailUser] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    const navigation = useNavigation<any>();

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
                username: detailUser?.username,
                email: detailUser?.email,
                name: detailUser.name,
                address: detailUser.address,
                phone: detailUser.phone,
                cccd: detailUser.cccd,
                sex: detailUser.sex,
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
                setLoading
            ).then((response) => {
                if (response) {
                    setDataPosition({
                        data: response
                    })
                    setDetailUser(response)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getProfileUser().then(() => { })
    }, []);
    console.log("dataProfile", dataProfile);

    const onUpdateProfile = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            try {
                await authService.updateProfile(
                    {
                        name: dataProfile.name,
                        username: dataProfile.username,
                        email: dataProfile.email,
                        address: dataProfile.address,
                        phone: dataProfile.phone,
                        cccd: dataProfile.cccd,
                    },
                    setLoading,
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
                                label={"Địa chỉ"}
                                attribute={"address"}
                                dataAttribute={dataProfile.address}
                                isRequired={false}
                                setData={setDataProfile}
                                editable={true}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                            <InputTextCommon
                                label={"SĐT"}
                                attribute={"phone"}
                                dataAttribute={dataProfile.phone}
                                isRequired={false}
                                setData={setDataProfile}
                                editable={true}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                            <InputTextCommon
                                label={"Căn cước công dân"}
                                attribute={"cccd"}
                                dataAttribute={dataProfile.cccd}
                                isRequired={false}
                                setData={setDataProfile}
                                editable={true}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                            {/* <SelectCommon
                                label={"Giới tính"}
                                attribute={"sex"}
                                dataAttribute={dataProfile.sex}
                                isRequired={false}
                                setData={setDataProfile}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                                listArray={Constants.Gender.List}
                            /> */}
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
            <LoadingFullScreen loading={loading} />
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