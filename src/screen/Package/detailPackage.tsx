import React, { useCallback, useEffect, useState } from 'react'
import MainLayout from "../../infrastructure/common/layouts/layout";
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, View, Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import LoadingFullScreen from '../../infrastructure/common/components/controls/loading';
import { arrayBufferToBase64, convertDateBooking, formatCurrencyVND } from '../../infrastructure/helper/helper';
import { ProfileState } from '../../core/atoms/profile/profileState';
import packageService from '../../infrastructure/repositories/package/service/package.service';
import { PackageState } from '../../core/atoms/package/packageState';
import Foundation from 'react-native-vector-icons/Foundation';

const { width: viewportWidth } = Dimensions.get('window');
const { height: viewportHeight } = Dimensions.get('window');

const DetailPackageScreen = () => {
    const [detailPackage, setDetailPackage] = useState<any>({})
    const navigation = useNavigation<any>();
    const packageState = useRecoilValue(PackageState).data;
    const profileState = useRecoilValue(ProfileState).data;

    const [loading, setLoading] = useState<boolean>(false);
    const [isRegister, setIsRegister] = useState<boolean>(false);

    const onGoBack = () => {
        navigation.goBack();
    }

    const getBranchByIdAsync = async () => {
        try {
            await packageService.getPackageById(
                Number(packageState.id),
                setLoading
            ).then((response) => {
                if (response) {
                    setDetailPackage(response)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getBranchByIdAsync().then(() => { })
    }, []);


    const onRegistePackageAsync = async () => {
        const now = new Date();
        const data = {
            pack: {
                id: Number(packageState.id)
            },
            quantity: 1,
            startDate: convertDateBooking(String(now))
        }
        try {
            await packageService.addPackage(
                data,
                setLoading,
            ).then(async (response) => {
                if (response) {
                    // Linking.canOpenURL(response.url)
                    //     .then((supported) => {
                    //         console.log("supported", supported);

                    //         if (supported) {
                    //             Linking.openURL(response.url);
                    //             Alert.alert(`Đăng kí gói thành viên thành công`)
                    //         } else {
                    //             Alert.alert(`Không thể mở đến trang VNPay`);
                    //         }
                    //     })
                    //     .catch((err) => console.error('An error occurred', err));
                    Linking.openURL(response.url).catch((err) => {
                        if (err) {
                            Alert.alert(`Không thể mở đến trang VNPay`);
                        }
                    });
                };
            }
            );
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const handleUrl = (event: any) => {
            console.log('Incoming URL:', event.url);
        };

        Linking.addEventListener('url', handleUrl);

        Linking.getInitialURL().then((url) => {
            if (url) {
                handleUrl({ url });
            }
        });
        // Cleanup the event listener on unmount
        // return () => {
        //     Linking.removeAllListeners('url');
        // };
    }, []);

    const onRegistePackageConfirm = async () => {

        Alert.alert('Đăng ký thành viên', 'Bạn muốn đăng ký thành viên?', [
            {
                text: 'Hủy',
                style: 'cancel',
            },
            {
                text: 'Đăng ký', onPress: onRegistePackageAsync,
            }
        ]);
    };
    useEffect(() => {
        profileState?.packs?.filter((it: any) => {
            if (it.id == packageState.id) {
                setIsRegister(true)
            }
        })
    }, [profileState])

    return (
        <MainLayout
            title={""}
            isBackButton={true}
            onGoBack={onGoBack}
            bgImg={`data:image/jpeg;base64,${detailPackage?.image?.data}`}
        >
            <ScrollView style={styles.container}>
                <View >
                    <View style={{
                        flexDirection: "column",
                        gap: 20,
                        paddingHorizontal: 24,
                        paddingVertical: 20,
                    }}
                    >
                        <View
                            style={styles.card}
                        >
                            <Text
                                style={styles.title}
                            >
                                {detailPackage.name}
                            </Text>
                            <Text
                                style={styles.subTitle}
                            >
                                <Foundation name="pricetag-multiple" size={16} color="#D0FD3E" /> {formatCurrencyVND(String(detailPackage.price))}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={styles.title}
                            >
                                Thời hạn gói: {detailPackage.duration} ngày
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.description}>
                                Đăng kí gói thành viên ngay hôm này !!!!.
                            </Text>
                            <Text style={styles.description}>
                                Nhanh tay đăng kí để nhân được nhiều ưu đãi !!!!
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 16
                            }}
                        >
                            {
                                isRegister
                                    ?
                                    <Pressable
                                        style={[
                                            styles.register,
                                            {
                                                backgroundColor: "#cbcbcb"
                                            }
                                        ]}
                                    >
                                        <MaterialIcons name="verified" size={16} color="#000000" />
                                        <Text style={[
                                            styles.textBtn,
                                            {
                                                color: "#000000"
                                            }
                                        ]}>Đã đăng ký</Text>
                                    </Pressable>
                                    :
                                    <Pressable
                                        style={styles.register}
                                        onPress={onRegistePackageConfirm}
                                    >
                                        <Entypo name="add-user" size={16} color="#000000" />
                                        <Text style={[
                                            styles.textBtn,
                                            {
                                                color: "#000000"
                                            }
                                        ]}>Đăng ký gói</Text>
                                    </Pressable>
                            }

                        </View>
                    </View>
                </View>
            </ScrollView>
            <LoadingFullScreen loading={loading} />
        </MainLayout >
    )
}

export default DetailPackageScreen;
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1C1C1E",
        borderRadius: 20,
        marginTop: -60
    },

    textTitle: {
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 20,
        marginBottom: 20
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#ebebeb',
        margin: 8,
    },
    card: {
        display: "flex",
        flexDirection: "column",
        gap: 4
    },
    member: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#2C2C2E",
        borderRadius: 20,
        padding: 12,
    },
    register: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#D0FD3E",
        borderRadius: 20,
        padding: 12,
    },
    title: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "600",
    },
    subTitle: {
        fontSize: 13,
        color: "#D0FD3E",
        fontWeight: "600"
    },
    textBtn: {
        fontSize: 14,
        color: "#FFFFFF",
        fontWeight: "500",
    },
    description: {
        fontSize: 16,
        color: "#D0FD3E",
        fontWeight: "500",
        fontStyle: "italic"
    },
    room: {
        flexDirection: "column",
        gap: 16
    },
    roomContent: {
        backgroundColor: "#2C2C2E",
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 8
    },
    roomInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    imgRoom: {
        width: viewportWidth / 5,
        height: viewportHeight / 11,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    }
})