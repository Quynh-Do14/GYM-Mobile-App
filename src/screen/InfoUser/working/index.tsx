import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import MainLayout from '../../../infrastructure/common/layouts/layout'
import bookingService from '../../../infrastructure/repositories/booking/service/booking.service';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { convertDate } from '../../../infrastructure/helper/helper';

const WorkoutSessions = () => {
    const [listWorkoutSession, setListWorkoutSession] = useState<Array<any>>([])
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();

    const onGoBack = () => {
        navigation.goBack();
    }

    const getWorkoutSessions = async () => {
        const params = {}
        try {
            await bookingService.Workout(
                params,
                () => { }
            ).then((response) => {
                if (response) {
                    setListWorkoutSession(response)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        getWorkoutSessions().then(() => { })
    }, [])

    useEffect(() => {
        if (isFocused) {
            getWorkoutSessions().then(() => { })
        }
    }, [isFocused]);
    return (
        <MainLayout
            title={"Theo dõi luyện tập"}
            isBackButton={true}
            onGoBack={onGoBack}
        >
            <ScrollView>
                <View style={styles.container}>
                    {
                        listWorkoutSession && listWorkoutSession.length
                            ?
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12
                                }}
                            >
                                {
                                    listWorkoutSession && listWorkoutSession.length && listWorkoutSession.map((it, index) => {
                                        if (it !== null) {
                                            return (
                                                <View
                                                    key={index}
                                                    style={styles.content}
                                                >
                                                    {/* <View>
                                                        <View style={styles.avatarChange}>
                                                            <Image
                                                                source={it?.employee?.avatar ? { uri: it?.booking?.employee?.avatar } : require("../../../../assets/images/avatar.png")}
                                                                resizeMode={"contain"}
                                                                style={{
                                                                    width: 72,
                                                                    height: 72,
                                                                    borderRadius: 50
                                                                }}
                                                            />
                                                        </View>
                                                    </View> */}

                                                    <View
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            gap: 4
                                                        }}
                                                    >
                                                        <View>
                                                            <Text style={styles.title}>Người hướng dẫn</Text>
                                                            <Text style={styles.fontStyle}>{it?.booking?.employee?.name && it?.booking?.employee?.name}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={styles.title}>Lịch đặt</Text>
                                                            <Text style={styles.fontStyle}>{convertDate(it?.booking?.bookingTime)?.toString()}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={styles.title}>Kết thúc</Text>
                                                            <Text style={styles.fontStyle}>{convertDate(it?.booking?.endTime)?.toString()}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={styles.title}>Mục tiêu</Text>
                                                            <Text style={styles.fontStyle}>{it.goal || "Chưa có"}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={styles.title}>Bài tập</Text>
                                                            <Text style={styles.fontStyle}>{it.exercise || "Chưa có"}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={styles.title}>Tiến độ</Text>
                                                            <Text style={styles.fontStyle}>{it.evaluation || "Chưa có"}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        }

                                    })
                                }
                            </View>
                            :
                            <View>
                                <Text style={[
                                    {
                                        textAlign: "center"
                                    },
                                    styles.fontStyle
                                ]}>Bạn chưa đăng kí lịch tập nào</Text>
                            </View>
                    }
                </View >
            </ScrollView>
        </MainLayout >
    )
}

export default WorkoutSessions
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1C1C1E",
        paddingVertical: 20
    },
    content: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        paddingHorizontal: 12,
        paddingVertical: 16,
        backgroundColor: "#2C2C2E",
        borderRadius: 12,
        elevation: 10
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
    title: {
        fontSize: 12,
        color: "#D0FD3E",
        fontWeight: "600"
    },
    fontStyle: {
        color: "#FFFFFF",
        fontFamily: "Roboto Regular",
        fontWeight: "900",
    },

})