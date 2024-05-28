import { useRecoilState } from 'recoil';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import authService from '../../repositories/auth/service/auth.service'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: viewportWidth } = Dimensions.get('window');

const MainLayout = ({ onGoBack, isBackButton = false, title, bgImg, ...props }: any) => {
    const [, setDataPosition] = useRecoilState(ProfileState);
    const [token, setToken] = useState<string>("");

    const getTokenStoraged = async () => {
        const token = await AsyncStorage.getItem("token").then(result => {
            if (result) {
                setToken(result)
            }
        });
        return token;
    };
    useEffect(() => {
        getTokenStoraged().then(() => { })
    }, [])

    const getProfileUser = async () => {
        if (token) {
            try {
                await authService.profile(
                    () => { }
                ).then((response) => {
                    if (response) {
                        setDataPosition({
                            data: response
                        })
                    }
                })
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    useEffect(() => {
        if (token) {
            getProfileUser().then(() => { })
        }
    }, [token])
    return (
        <View style={[
            styles.container,
            {
                paddingHorizontal: bgImg ? 0 : 20,
                paddingTop: bgImg ? 0 : 20
            }
        ]}>
            {
                bgImg
                    ?
                    <ImageBackground
                        source={{ uri: bgImg }}
                        style={[
                            styles.header,
                            {
                                width: viewportWidth,
                                height: 200,
                                paddingHorizontal: 20,
                                paddingTop: 20,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                                marginBottom: 20,
                            }
                        ]}>
                        <View style={styles.flex1} >
                            <TouchableOpacity
                                onPress={onGoBack}
                            >
                                {isBackButton &&
                                    <View  >
                                        <Image source={require("../../../../assets/images/arrow-ios-back-outline.png")} />
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.flex2}>
                            <Text style={styles.textTitle}>{title}</Text>
                        </View>
                        <View style={styles.flex1}>
                        </View>
                    </ImageBackground>
                    :
                    <View style={styles.header}>
                        <View style={styles.flex1} >
                            <TouchableOpacity
                                onPress={onGoBack}
                            >
                                {isBackButton &&
                                    <View  >
                                        <Image source={require("../../../../assets/images/arrow-ios-back-outline.png")} />
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.flex2}>
                            <Text style={styles.textTitle}>{title}</Text>
                        </View>
                        <View style={styles.flex1}>
                        </View>
                    </View>
            }
            {props.children}
        </View >
    )
}

export default MainLayout

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1C1C1E",
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 1,
    },
    content: {
        flex: 1
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20
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
    textTitle: {
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 20,
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