/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { TextInput, View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { validateFields } from "../../../helper/helper";
import { MessageError } from '../controls/MessageError';

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
const InputTextCommon = (props: Props) => {
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
    const labelLower = label?.toLowerCase();

    const onBlur = (isImplicitChange = false) => {
        validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "")
    }

    const onChange = (value: string) => {
        setValue(value || "");
        setData({
            [attribute]: value || ''
        });
        validateFields(false, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "")
    };

    useEffect(() => {
        setValue(dataAttribute || '');
    }, [dataAttribute]);

    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);
    return (
        <KeyboardAvoidingView>
            <View
                style={styles.container}
            >
                <Text style={styles.labelStyle}>
                    {label}
                </Text>
                <TextInput
                    placeholder={`Nhập ${labelLower}`}
                    value={value}
                    onChangeText={onChange}
                    onBlur={() => onBlur(false)}
                    placeholderTextColor={"#ffffff75"}
                    editable={editable}
                    style={[
                        { position: "relative" },
                        styles.fontStyle,
                        styles.inputStyle,
                        validate[attribute]?.isError && styles.errorStyle

                    ]} />
                <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
            </View>
        </KeyboardAvoidingView>
    )
};
export default InputTextCommon;
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