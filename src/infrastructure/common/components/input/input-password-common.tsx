/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { TextInput, View, Text, StyleSheet, Pressable, Image } from 'react-native';
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
    submittedTime?: any,
}
const InputPasswordCommon = (props: Props) => {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        validate,
        setValidate,
        submittedTime
    } = props;
    const [value, setValue] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const labelLower = label?.toLowerCase();
    const onChange = (value: string) => {
        let isImplicitChange
        setValue(value || "");
        setData({
            [attribute]: value || ''
        });
        validateFields(false, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "")
    };

    useEffect(() => {
        setValue(dataAttribute || '');

    }, [dataAttribute]);

    // useEffect(() => {
    //     if (submittedTime != null) {
    //         onBlur(true);
    //     }
    // }, [submittedTime]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <View>
            <Text style={styles.labelStyle}>
                {label}
            </Text>
            <View>
                <TextInput
                    placeholder={`Nhập ${labelLower}`}
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor={"#ffffff75"}
                    style={[{ position: "relative" },
                    styles.fontStyle,
                    styles.inputStyle,
                    validate[attribute]?.isError && styles.errorStyle
                    ]} />
                <Pressable onPress={toggleShowPassword} style={styles.icon}>
                    {
                        showPassword
                            ?
                            <Image source={require("../../../../../assets/images/hide.png")} />
                            :
                            <Image source={require("../../../../../assets/images/open.png")} />
                    }
                </Pressable>
            </View>
            <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
        </View>
    )
};
export default InputPasswordCommon;
const styles = StyleSheet.create({
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
        marginBottom: 12,
    },
    btnStyle: {
        backgroundColor: "#D0FD3E",
        paddingVertical: 16,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        padding: 8,
        position: "absolute",
        right: 0,
        top: 4
    },
    errorStyle: {
        borderBottomColor: "#f61a1a",
    }
})