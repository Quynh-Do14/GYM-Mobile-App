import { Animated, ImageBackground, StyleSheet, Text, Easing, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import Constants from '../../../core/common/constants';
import LoginTab from './login';
import RegisterTab from './register';
import LoadingFullScreen from '../../../infrastructure/common/components/controls/loading';
const LoginScreen = () => {
    const [tabSelect, setTabSelect] = useState(1)
    const [rotation,] = useState(new Animated.Value(0));
    const [loading, setLoading] = useState<boolean>(false);

    const onChangeTab = (value: number) => {
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


    return (
        <View style={styles.container}>

            <View style={[
                {
                    height: '40%',
                }
            ]}>
                <ImageBackground
                    source={require("../../../../assets/images/loginBg.jpg")}
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
                <Animated.View style={[{ transform: [{ rotateY: spin }] }]}>
                    {
                        tabSelect == 1
                            ?
                            <LoginTab
                                setLoading={setLoading}
                            />
                            :
                            <RegisterTab
                                setLoading={setLoading}
                                setTabSelect={setTabSelect}
                            />

                    }

                </Animated.View>

            </View>
            <LoadingFullScreen loading={loading} />
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