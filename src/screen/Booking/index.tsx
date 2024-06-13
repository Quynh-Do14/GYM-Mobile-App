import React, { useEffect, useState } from 'react'
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MainLayout from '../../infrastructure/common/layouts/layout'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import InputTextCommon from '../../infrastructure/common/components/input/input-text-common';
import InputDatePickerCommon from '../../infrastructure/common/components/input/input-date-common';
import SelectEmployeeCommon from '../../infrastructure/common/components/input/select-employee-common';
import bookingService from '../../infrastructure/repositories/booking/service/booking.service';
import { convertDateBooking } from '../../infrastructure/helper/helper';
import DialogNotificationCommon from '../../infrastructure/common/components/dialog/dialogNotification';
import LoadingFullScreen from '../../infrastructure/common/components/controls/loading';
const BookingScreen = () => {

    const navigation = useNavigation<any>()
    const [_data, _setData] = useState<any>({});
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>(null);
    const [isMessageSuccess, setIsMessageSuccess] = useState<boolean>(false);
    const [isMessageError, setIsMessageError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const dataBooking = _data;
    const setDataBooking = (data: any) => {
        Object.assign(dataBooking, { ...data });
        _setData({ ...dataBooking });
    };
    const isFocused = useIsFocused();

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

    const onBookingAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            try {
                await bookingService.Booking(
                    {
                        employee: {
                            id: dataBooking.id
                        },
                        bookingTime: convertDateBooking(dataBooking.bookingTime),
                        endTime: convertDateBooking(dataBooking.endTime)
                    },
                    setLoading,
                    () => { },
                    () => { }
                    // setIsMessageSuccess,
                    // setIsMessageError
                ).then(async (response) => {
                    if (response.url) {
                        Linking.openURL(response.url).catch((err) => {
                            if (err) {
                                Alert.alert(`Không thể mở đến trang VNPay`);
                            }
                        });

                        setDataBooking({})
                    }
                });
            } catch (error) {
                console.error(error);
                Alert.alert(`Đăng kí lịch tập không thành công`);
            }
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

    const onBookingConfirm = async () => {

        Alert.alert('Đăng ký lịch tập', 'Bạn muốn đăng ký thành viên?', [
            {
                text: 'Hủy',
                style: 'cancel',
            },
            {
                text: 'Đăng ký', onPress: onBookingAsync,
            }
        ]);
    };

    useEffect(() => {
        if (isFocused) {
            setDataBooking({
                bookingTime: "",
                endTime: "",
                id: ""
            })
        }
    }, [isFocused]);

    return (
        <MainLayout
            title={"Đăng kí lịch tập"}
        >
            <View style={styles.content}>
                <ScrollView>
                    <View>
                        <InputDatePickerCommon
                            label={"Ngày đặt"}
                            attribute={"bookingTime"}
                            dataAttribute={dataBooking.bookingTime}
                            isRequired={false}
                            setData={setDataBooking}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />

                        <InputDatePickerCommon
                            label={"Ngày kết thúc"}
                            attribute={"endTime"}
                            dataAttribute={dataBooking.endTime}
                            isRequired={false}
                            setData={setDataBooking}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                        <SelectEmployeeCommon
                            label={"Chọn người hướng dẫn"}
                            attribute={"id"}
                            dataAttribute={dataBooking}
                            isRequired={false}
                            setData={setDataBooking}
                            editable={true}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </View>
                </ScrollView>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={onBookingConfirm}
                >
                    <Text style={styles.textBtnStyle}>Đặt lịch</Text>
                </TouchableOpacity>
            </View>
            <DialogNotificationCommon
                visible={isMessageSuccess}
                onConfirm={() => setIsMessageSuccess(false)}
                message={"Đặt lịch thành công"}
            />
            <DialogNotificationCommon
                visible={isMessageError}
                onConfirm={() => setIsMessageError(false)}
                message={"Đặt lịch không thành công"}
            />
            <LoadingFullScreen loading={loading} />
        </MainLayout >
    )
}

export default BookingScreen
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
    datePicker: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginTop: 10,
    },
})