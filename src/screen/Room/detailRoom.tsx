import React, { useEffect, useState } from 'react'
import MainLayout from "../../infrastructure/common/layouts/layout";
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import LoadingFullScreen from '../../infrastructure/common/components/controls/loading';
import { Image } from 'react-native';
import roomService from '../../infrastructure/repositories/room/service/room.service';
import { RoomState } from '../../core/atoms/roomState/roomState';
import { arrayBufferToBase64 } from '../../infrastructure/helper/helper';

const { width: viewportWidth } = Dimensions.get('window');
const { height: viewportHeight } = Dimensions.get('window');

const DetailRoomScreen = () => {
    const [detailRoom, setDetailRoom] = useState<any>({});
    const [detailRoomEquipment, setDetailRoomEquipment] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isShowMore, setIsShowMore] = useState<boolean>(false);

    const navigation = useNavigation();
    const roomState = useRecoilValue(RoomState).data
    const onGoBack = () => {
        navigation.goBack();
    }

    const getRoomByIdAsync = async () => {
        try {
            await roomService.getRoomById(
                Number(roomState?.room?.id),
                setLoading
            ).then((response) => {
                if (response) {
                    setDetailRoom(response)
                    setDetailRoomEquipment(response?.equipmentAmounts)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getRoomByIdAsync().then(() => { })
    }, [])

    const onGetAvatarAsync = async () => {
        try {
            await roomService.getAvatar(
                Number(roomState?.room?.id),
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

    return (
        <MainLayout
            title={""}
            isBackButton={true}
            onGoBack={onGoBack}
            bgImg={imageUrl}
        >
            <ScrollView style={styles.container}>
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
                            Phòng tập: {detailRoom.name}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.description} numberOfLines={isShowMore ? 0 : 3}>
                            {detailRoom.description}
                        </Text>
                        <Pressable onPress={() => setIsShowMore(!isShowMore)}>
                            <Text style={styles.subTitle}>{!isShowMore ? "Xem thêm..." : "Ẩn bớt"} </Text>
                        </Pressable>
                    </View>
                    <View style={styles.room}>
                        <View>
                            <Text style={styles.title}>
                                Thống kê thiết bị
                            </Text>
                        </View>
                        {
                            detailRoomEquipment && detailRoomEquipment.length
                                ?
                                <View style={{
                                    flexDirection: "column",
                                    gap: 12
                                }}>
                                    {
                                        detailRoomEquipment && detailRoomEquipment.length && detailRoomEquipment.map((it: any, index: number) => {
                                            return (
                                                <Pressable
                                                    key={index}
                                                    style={styles.roomContent}
                                                >
                                                    <View style={styles.roomInfo}>
                                                        <View>
                                                            <Image
                                                                style={styles.imgRoom}
                                                                source={{ uri: `data:image/jpeg;base64,${it?.equipment?.image?.data}` }}
                                                            />
                                                        </View>
                                                        <View
                                                            style={styles.card}
                                                        >
                                                            <Text
                                                                style={styles.title}
                                                            >
                                                                {it?.equipment?.name}
                                                            </Text>
                                                            <Text
                                                                style={styles.subTitle}
                                                            >
                                                                Số lượng: {it?.amount}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </Pressable>
                                            )
                                        })
                                    }
                                </View>
                                :
                                <View>
                                    <Text style={[
                                        {
                                            textAlign: "center",
                                            backgroundColor: "#2C2C2E",
                                            padding: 20,
                                            borderRadius: 12
                                        },
                                        styles.title
                                    ]}>
                                        Chưa có thiết bị nào !!</Text>
                                </View>

                        }
                    </View>
                </View>
            </ScrollView>
            <LoadingFullScreen loading={loading} />
        </MainLayout >
    )
}

export default DetailRoomScreen;
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