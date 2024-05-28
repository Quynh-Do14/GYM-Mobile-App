import React, { useEffect, useState } from 'react'
import MainLayout from "../../infrastructure/common/layouts/layout";
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BranchState } from '../../core/atoms/branchState/branchState';
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import branchService from '../../infrastructure/repositories/branch/service/branch.service';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Image } from 'react-native';
import Constants from '../../core/common/constants';
import { RoomState } from '../../core/atoms/roomState/roomState';
import LoadingFullScreen from '../../infrastructure/common/components/controls/loading';
import { arrayBufferToBase64 } from '../../infrastructure/helper/helper';
import authService from '../../infrastructure/repositories/auth/service/auth.service';
import { ProfileState } from '../../core/atoms/profile/profileState';

const { width: viewportWidth } = Dimensions.get('window');
const { height: viewportHeight } = Dimensions.get('window');

const DetailBranchScreen = () => {
    const [detailBranch, setDetailBranch] = useState<any>({})
    const navigation = useNavigation<any>();
    const branchState = useRecoilValue(BranchState).data;
    const profileState = useRecoilValue(ProfileState).data;

    const [loading, setLoading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isShowMore, setIsShowMore] = useState<boolean>(false);

    const [, setRoomState] = useRecoilState(RoomState)

    const onGoBack = () => {
        navigation.goBack();
    }

    const getBranchByIdAsync = async () => {
        try {
            await branchService.getBranchById(
                Number(branchState.id),
                setLoading
            ).then((response) => {
                if (response) {
                    setDetailBranch(response)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getBranchByIdAsync().then(() => { })
    }, []);

    const onNavigateRoom = (it: any) => {
        navigation.navigate(
            Constants.Navigator.Room.DetailRoomScreen.value,
            setRoomState({
                data: it
            })
        )
    }
    const onGetAvatarAsync = async () => {
        try {
            await branchService.getAvatar(
                Number(branchState.id),
                setLoading
            ).then((response) => {
                const base64String = arrayBufferToBase64(response);
                const imageSrc = `data:image/jpeg;base64,${base64String}`;
                setImageUrl(imageSrc)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetAvatarAsync().then(() => { })
    }, [])

    const onRegisterBranchAsync = async () => {
        try {
            await authService.updateProfile(
                {
                    gymBranch: Number(branchState.id),
                },
                setLoading,
                // setIsMessageSuccess,
                // setIsMessageError,
                () => { },
                () => { },
            ).then((response) => {
                if (response) {
                    getBranchByIdAsync().then(() => { });
                    onGetAvatarAsync().then(() => { });
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
    const onRegisterBranchConfirm = () => {
        Alert.alert('Đăng ký thành viên', 'Bạn muốn đăng ký thành viên?', [
            {
                text: 'Hủy',
                style: 'cancel',
            },
            {
                text: 'Đăng ký', onPress: onRegisterBranchAsync,
            }
        ]);
    };

    return (
        <MainLayout
            title={""}
            isBackButton={true}
            onGoBack={onGoBack}
            bgImg={imageUrl}
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
                                {detailBranch.branchGymName}
                            </Text>
                            <Text
                                style={styles.subTitle}
                            >
                                <Entypo name="location" size={16} color="#D0FD3E" /> {detailBranch.address}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 16
                            }}
                        >
                            <View style={styles.member}>
                                <Entypo name="user" size={16} color="#fff" />
                                <Text style={styles.textBtn}>{detailBranch.totalMember} Thành viên</Text>
                            </View>
                            {
                                profileState?.gymBranch?.id == branchState.id
                                    ?
                                    <Pressable
                                        style={[
                                            styles.register,
                                            {
                                                backgroundColor:"#cbcbcb"
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
                                        onPress={onRegisterBranchConfirm}
                                    >
                                        <Entypo name="add-user" size={16} color="#000000" />
                                        <Text style={[
                                            styles.textBtn,
                                            {
                                                color: "#000000"
                                            }
                                        ]}>Đăng ký</Text>
                                    </Pressable>
                            }

                        </View>
                        <View>
                            <Text style={styles.description} numberOfLines={isShowMore ? 0 : 3}>
                                {detailBranch.description}
                            </Text>
                            <Pressable onPress={() => setIsShowMore(!isShowMore)}>
                                <Text style={styles.subTitle}>{!isShowMore ? "Xem thêm..." : "Ẩn bớt"} </Text>
                            </Pressable>
                        </View>

                        <View style={styles.room}>
                            <View>
                                <Text style={styles.title}>
                                    Thống kê phòng tập
                                </Text>
                            </View>
                            {
                                detailBranch?.roomAndAmounts?.map((it: any, index: number) => {
                                    return (
                                        <Pressable
                                            key={index}
                                            style={styles.roomContent}
                                            onPress={() => onNavigateRoom(it)}
                                        >
                                            <View style={styles.roomInfo}>
                                                <View>
                                                    <Image
                                                        style={styles.imgRoom}
                                                        source={{ uri: `data:image/jpeg;base64,${it?.room?.image?.data}` }}
                                                    />
                                                </View>
                                                <View
                                                    style={styles.card}
                                                >
                                                    <Text
                                                        style={styles.title}
                                                    >
                                                        {it?.room?.name}
                                                    </Text>
                                                    <Text
                                                        style={styles.subTitle}
                                                    >
                                                        Số lượng: {it?.amount} Phòng
                                                    </Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Entypo name="triangle-right" size={20} color="#fff" />
                                            </View>
                                        </Pressable>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
            <LoadingFullScreen loading={loading} />
        </MainLayout >
    )
}

export default DetailBranchScreen;
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
        fontSize: 14,
        color: "#FFFFFF",
        fontWeight: "500",

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