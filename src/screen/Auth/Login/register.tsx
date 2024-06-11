import { TouchableOpacity, View, KeyboardAvoidingView, ScrollView, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import Constants from '../../../core/common/constants';
import authService from '../../../infrastructure/repositories/auth/service/auth.service';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import InputTextCommon from '../../../infrastructure/common/components/input/input-text-common';
import InputPasswordCommon from '../../../infrastructure/common/components/input/input-password-common';
import DialogNotificationCommon from '../../../infrastructure/common/components/dialog/dialogNotification';
import LoadingFullScreen from '../../../infrastructure/common/components/controls/loading';

type Props = {
    setTabSelect: Function,
    setLoading: Function
}
const RegisterTab = (props: Props) => {
    const { setTabSelect, setLoading } = props;
    const [_data, _setData] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>(null);


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

    const onSignupAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            try {
                await authService.register(
                    {
                        name: dataProfile.name,
                        email: dataProfile.email,
                        username: dataProfile.username,
                        password: dataProfile.password,
                        roles: ["user"],
                    },
                    setLoading,
                ).then((response) => {
                    if (response) {
                        setTabSelect(1)
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <ScrollView>
            <View style={[
                styles.flexCol,
                {
                    gap: 20,
                    justifyContent: "space-between",
                    height: "100%"
                }
            ]}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 20
                    }}
                >
                    <InputTextCommon
                        label={"Email"}
                        attribute={"email"}
                        dataAttribute={dataProfile.email}
                        isRequired={true}
                        setData={setDataProfile}
                        editable={true}
                        validate={validate}
                        setValidate={setValidate}
                        submittedTime={submittedTime}
                    />
                    <InputTextCommon
                        label={"Tên người dùng"}
                        attribute={"name"}
                        dataAttribute={dataProfile.name}
                        isRequired={true}
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
                        isRequired={true}
                        setData={setDataProfile}
                        editable={true}
                        validate={validate}
                        setValidate={setValidate}
                        submittedTime={submittedTime}
                    />
                    <InputPasswordCommon
                        label={"Mật khẩu"}
                        attribute={"password"}
                        dataAttribute={dataProfile.password}
                        isRequired={true}
                        setData={setDataProfile}
                        validate={validate}
                        setValidate={setValidate}
                        submittedTime={submittedTime}
                    />
                </View>
                <TouchableOpacity
                    style={[
                        styles.btnStyle
                    ]}
                    onPress={onSignupAsync}
                >
                    <Text
                        style={[
                            styles.fontStyle,
                            {
                                color: "#1C1C1E",
                            }
                        ]}
                    > Đăng kí
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default RegisterTab
const styles = StyleSheet.create({
    container: {
        // display: "flex",
        // flexDirection: "column",
        backgroundColor: "#1C1C1E",
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    backgroundImage: {
        width: '100%',
        height: '55%',
    },
    section: {
        height: '50%',
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    fontStyle: {
        color: "#FFFFFF",
        fontFamily: "Roboto Regular",
        fontWeight: "900",
    },
    activeTab: {
        paddingBottom: 3,
        borderBottomWidth: 2,
        borderBottomColor: "#D0FD3E"
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