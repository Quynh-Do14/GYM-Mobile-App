import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import MainLayout from '../../../infrastructure/common/layouts/layout'
import bookingService from '../../../infrastructure/repositories/booking/service/booking.service';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { convertDate } from '../../../infrastructure/helper/helper';

const BookingSchedule = () => {
    const [listBooking, setListBooking] = useState<Array<any>>([])
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();

    const onGoBack = () => {
        navigation.goBack();
    }

    const getBooking = async () => {
        const params = {}
        try {
            await bookingService.getBooking(
                params,
                () => { }
            ).then((response) => {
                if (response) {
                    setListBooking(response.content)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBooking().then(() => { })
    }, [])

    useEffect(() => {
        if (isFocused) {
            getBooking().then(() => { })
        }
    }, [isFocused]);
    return (
        <MainLayout
            title={"Lịch đăng kí"}
            isBackButton={true}
            onGoBack={onGoBack}
        >
            <ScrollView>
                <View style={styles.container}>
                    {
                        listBooking && listBooking.length
                            ?
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12
                                }}
                            >
                                {
                                    listBooking && listBooking.length && listBooking.map((it, index) => {
                                        return (
                                            <View
                                                key={index}
                                                style={styles.content}
                                            >
                                                <View>
                                                    <View style={styles.avatarChange}>
                                                        <Image
                                                            source={it?.employee?.avatar ? { uri: it?.employee?.avatar } : require("../../../../assets/images/avatar.png")}
                                                            resizeMode={"contain"}
                                                            style={{
                                                                width: 72,
                                                                height: 72,
                                                                borderRadius: 50
                                                            }}
                                                        />
                                                    </View>
                                                </View>

                                                <View
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 4
                                                    }}
                                                >
                                                    <View>
                                                        <Text style={styles.fontStyle}>{it?.employee?.name && it?.employee?.name}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.title}>Lịch đặt</Text>
                                                        <Text style={styles.fontStyle}>{convertDate(it.bookingTime)?.toString()}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.title}>Kết thúc</Text>
                                                        <Text style={styles.fontStyle}>{convertDate(it.endTime)?.toString()}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
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

export default BookingSchedule
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