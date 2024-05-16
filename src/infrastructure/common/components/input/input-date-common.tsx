/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { convertDate, validateFields } from "../../../helper/helper";
import { MessageError } from '../controls/MessageError';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute?: any,
    validate: any,
    setValidate: Function,
    submittedTime: any,
    editable: boolean
}
const InputDatePickerCommon = (props: Props) => {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        validate,
        setValidate,
        submittedTime,
        editable
    } = props;
    const [value, setValue] = useState<string>("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const labelLower = label?.toLowerCase();

    const handleConfirm = (date: any) => {
        hideDatePicker();
        setValue(date)
        setData({
            [attribute]: date || ''
        });
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };


    useEffect(() => {
        setValue(dataAttribute || '');
    }, [dataAttribute]);

    // useEffect(() => {
    //     if (submittedTime != null) {
    //         onBlur(true);
    //     }
    // }, [submittedTime]);

    return (
        <View
            style={styles.container}
        >
            <Text style={styles.labelStyle}>
                {label}
            </Text>
            <TextInput
                placeholder={`Chọn ${labelLower}`}
                placeholderTextColor={"#ffffff75"}
                editable={false}
                style={[
                    { position: "relative" },
                    styles.fontStyle,
                    styles.inputStyle
                ]}
                value={convertDate(value)?.toString()}

            />
            <TouchableOpacity
                onPress={() => showDatePicker()}
                style={{
                    position: "absolute",
                    right: 0,
                    top: 10
                }}>
                <Image source={require("../../../../../assets/images/calendar-outline.png")} />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                // date={new Date(value)}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    )
};
export default InputDatePickerCommon;
const styles = StyleSheet.create({
    container: {
        marginBottom: 12
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
        marginBottom: 4,
    },
    btnStyle: {
        backgroundColor: "#D0FD3E",
        paddingVertical: 16,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    errorStyle: {
        borderBottomColor: "#f61a1a",
    }
})