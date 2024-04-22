import { Animated, Image, ImageBackground, StyleSheet, Text, Easing, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import bgImg from "../../../../assets/images/loginBg.jpg";
import { useState } from 'react';
import Constants from '../../../core/common/constants';
import authService from '../../../infrastructure/repositories/auth/service/auth.service';
const LoginScreen = ({ navigation }) => {
    const [tabSelect, setTabSelect] = useState(1)
    const [rotation] = useState(new Animated.Value(0));

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfrim, setPasswordConfrim] = useState("");

    const [dataRegister, setDataRegister] = useState({ username: '', password: '' })
    const onLoginAsync = async () => {
        try {
            await authService.login(
                {
                    username: username,
                    password: password,
                },
                () => { }
            ).then((response) => {
                console.log("response", response);
                if (response) {
                    navigation.navigate(
                        Constants.Navigator.Navbar.value,
                        {},
                    )
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    const onChangeTab = (value) => {
        Animated.timing(rotation, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            rotation.setValue(0);
        });
        setTabSelect(value)
    }

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const onForgotPassword = () => {
        navigation.navigate(
            Constants.Navigator.Auth.ForgotPasswordScreen.value,
            {},
        )
    }

    const onRegisterAsync = async (values) => {

        const data = {
            fullName: fullName,
            email: email,
            username: username,
            password: password,
            roles: ["user"],
            dob: "2000-01-01",
            gender: "male"
        };
        try {
            await authService.register(
                data,
                () => { }
            ).then((response) => {
                if (response) {
                    setTabSelect(1)
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>

            <View style={[
                {
                    height: '40%',
                }
            ]}>
                <ImageBackground
                    source={bgImg}
                    style={[
                        styles.backgroundImage,
                        {
                            position: "relative",
                            height: "100%"
                        }
                    ]}
                >
                    <View
                        style={[
                            {
                                backgroundColor: "#00000063",
                                width: "100%",
                                height: "100%",
                                position: "absolute"
                            }
                        ]}
                    ></View>
                    <View style={[
                        styles.flexCol,
                        {
                            paddingVertical: 20,
                            paddingHorizontal: 30,
                            justifyContent: "space-between",
                            height: "100%",
                        }
                    ]}>
                        <View
                            style={[
                                styles.flexRow,
                                {
                                    gap: 30,
                                }
                            ]}
                        >
                            {Constants.AuthTab.List.map((it, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => onChangeTab(it.value)}
                                    style={
                                        tabSelect == it.value
                                            ?
                                            styles.activeTab
                                            :
                                            null
                                    }
                                >
                                    <Text
                                        style={[
                                            styles.fontStyle,
                                            { fontSize: 14 }
                                        ]}
                                    >
                                        {it.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View>
                            <Text
                                style={[
                                    styles.fontStyle,
                                    { fontSize: 24 }
                                ]}
                            >HELLO ROOKIES,
                            </Text>
                            <Text
                                style={[
                                    styles.fontStyle,
                                    { fontSize: 14 }
                                ]}
                            >Enter Your Information </Text>
                        </View>
                    </View>
                </ImageBackground>

            </View>
            <View style={[
                {
                    height: '60%',
                    paddingVertical: 30,
                    paddingHorizontal: 30,
                }
            ]}>
                <Animated.View style={[styles.tab, { transform: [{ rotateY: spin }] }]}>
                    {
                        tabSelect == 1
                            ?
                            <ScrollView>
                                <View style={[
                                    styles.flexCol,
                                    {
                                        gap: 20,
                                        justifyContent: "space-between",
                                        height: "100%"
                                    }
                                ]}>
                                    <KeyboardAvoidingView>
                                        <View
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 20
                                            }}
                                        >
                                            <TextInput
                                                placeholder='Tên đăng nhập'
                                                placeholderTextColor={"#ffffff"}
                                                onChangeText={(e) => setUsername(e)}
                                                style={[
                                                    styles.fontStyle,
                                                    styles.inputStyle
                                                ]} />
                                            <TextInput
                                                placeholder='Mật khẩu'
                                                placeholderTextColor={"#ffffff"}
                                                onChangeText={(e) => setPassword(e)}
                                                style={[
                                                    styles.fontStyle,
                                                    styles.inputStyle
                                                ]}
                                            />
                                            <View
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-end"
                                                }}>
                                                <TouchableOpacity
                                                    onPress={onForgotPassword}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: 13,
                                                            fontWeight: 500,
                                                            color: "#D0FD3E",
                                                        }}
                                                    >Quên mật khẩu
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </KeyboardAvoidingView>
                                    <TouchableOpacity
                                        style={[
                                            styles.btnStyle
                                        ]}
                                        onPress={onLoginAsync}
                                    >
                                        <Text
                                            style={[
                                                styles.fontStyle,
                                                {
                                                    color: "#1C1C1E",
                                                }
                                            ]}
                                        > Đăng nhập
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                            :
                            <ScrollView>
                                <View style={[
                                    styles.flexCol,
                                    {
                                        gap: 20,
                                        justifyContent: "space-between",
                                        height: "100%"
                                    }
                                ]}>
                                    <KeyboardAvoidingView>
                                        <View
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 20
                                            }}
                                        >
                                            <TextInput
                                                placeholder='Email'
                                                placeholderTextColor={"#ffffff"}
                                                value={email}
                                                onChangeText={(e) => setEmail(e)}
                                                style={[
                                                    styles.fontStyle,
                                                    styles.inputStyle
                                                ]} />
                                            <TextInput
                                                placeholder='Họ tên'
                                                placeholderTextColor={"#ffffff"}
                                                value={fullName}
                                                onChangeText={(e) => setFullName(e)}
                                                style={[
                                                    styles.fontStyle,
                                                    styles.inputStyle
                                                ]} />
                                            <TextInput
                                                placeholder='Tên đăng nhập'
                                                placeholderTextColor={"#ffffff"}
                                                value={username}
                                                onChangeText={(e) => setUsername(e)}
                                                style={[
                                                    styles.fontStyle,
                                                    styles.inputStyle
                                                ]} />
                                            <TextInput
                                                placeholder='Mật khẩu'
                                                placeholderTextColor={"#ffffff"}
                                                value={password}
                                                onChangeText={(e) => setPassword(e)}
                                                style={[
                                                    styles.fontStyle,
                                                    styles.inputStyle
                                                ]} />
                                            <TextInput
                                                placeholder='Nhập lại mật khẩu'
                                                placeholderTextColor={"#ffffff"}
                                                value={passwordConfrim}
                                                onChangeText={(e) => setPasswordConfrim(e)}
                                                style={[
                                                    styles.fontStyle,
                                                    styles.inputStyle
                                                ]} />
                                        </View>
                                    </KeyboardAvoidingView>

                                    <TouchableOpacity
                                        style={[
                                            styles.btnStyle
                                        ]}
                                        onPress={onRegisterAsync}
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

                    }

                </Animated.View>

            </View>
        </View>

    )
}

export default LoginScreen

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