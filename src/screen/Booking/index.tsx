import React, { useState } from 'react'
import { Button, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MainLayout from '../../infrastructure/common/layouts/layout'
import DatePicker from 'react-native-date-picker';
import { convertDate, convertDateOnly } from '../../infrastructure/helper/helper';
const BookingScreen = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfrim, setPasswordConfrim] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (newDate: any) => {
        setSelectedDate(newDate);
    };

    const handlePress = () => {
        setShowDatePicker(true);
    };

    const handleConfirm = (date: any) => {
        setSelectedDate(date);
        setShowDatePicker(false);
    };

    const handleCancel = () => {
        setShowDatePicker(false);
    };
    return (
        <MainLayout
            title={"Đăng kí lịch tập"}
        >
            <View style={styles.content}>
                <KeyboardAvoidingView>
                    <ScrollView>
                        <View>
                            <View>
                                <View>
                                    <Text style={styles.labelStyle}>
                                        Tên đăng nhập
                                    </Text>
                                    <TextInput
                                        placeholder='Tên đăng nhập'
                                        placeholderTextColor={"#ffffff"}
                                        style={[
                                            { position: "relative" },
                                            styles.fontStyle,
                                            styles.inputStyle
                                        ]} />
                                </View>

                                <View>
                                    <Text style={styles.labelStyle}>
                                        Chọn ngày
                                    </Text>
                                    <TextInput
                                        placeholder='Tên đăng nhập'
                                        placeholderTextColor={"#ffffff"}
                                        style={[
                                            { position: "relative" },
                                            styles.fontStyle,
                                            styles.inputStyle
                                        ]}
                                    // value={convertDateOnly(selectedDate.toString())}

                                    />
                                    <TouchableOpacity
                                        onPress={handlePress}
                                        style={{
                                            position: "absolute",
                                            right: 0,
                                            top: 10
                                        }}>
                                        <Image source={require("../../../assets/images/calendar-outline.png")} />
                                    </TouchableOpacity>
                                    {showDatePicker && (
                                        <View>
                                            <DatePicker
                                                // modal
                                                date={selectedDate}
                                                onDateChange={handleDateChange}
                                                onCancel={handleCancel}
                                                onConfirm={handleConfirm}
                                                mode="date"
                                                // textColor={"#FFFFFF"}
                                                style={styles.datePicker}
                                                confirmText={"OK"}
                                            />
                                            <Button title="Chọn ngày" onPress={handleCancel} />
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
            <View>
                <TouchableOpacity style={styles.btnStyle}>
                    <Text style={styles.textBtnStyle}>Đặt lịch</Text>
                </TouchableOpacity>
            </View>

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