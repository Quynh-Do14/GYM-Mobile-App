/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { convertTimeParams, validateFields } from "../../../helper/helper";
import { MessageError } from '../controls/MessageError';
import { Picker } from '@react-native-picker/picker';
import employeeService from '../../../repositories/employee/service/employee.service';

type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute?: any,
    validate: any,
    setValidate: Function,
    submittedTime: any,
    listArray: Array<any>,
}
const SelectCommon = (props: Props) => {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        validate,
        setValidate,
        submittedTime,
        listArray,
    } = props;
    const [valueInput, setValueInput] = useState<number>();

    const labelLower = label?.toLowerCase();
    const pickerRef = useRef<any>();

    const validateEvent = (isImplicitChange: boolean = false) => {
        let checkValidate
        validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? `Vui lòng nhập ${labelLower}` : "")
    }

    const onChange = (value: number, itemIndex: number) => {
        setValueInput(value);
        setData({
            [attribute]: value || ''
        });
        validateEvent(false)
    };

    useEffect(() => {
        setValueInput(dataAttribute || '');

    }, [dataAttribute]);

    useEffect(() => {
        if (submittedTime != null) {
            validateEvent(true);
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
                <View
                    style={
                        validate[attribute]?.isError && styles.errorStyle
                    }
                >
                    <Picker
                        ref={pickerRef}
                        selectedValue={valueInput}
                        onValueChange={onChange}
                        style={{
                            padding: 0,
                            color: "#FFFFFF",
                            fontFamily: "Roboto Regular",
                            fontWeight: "900",
                            marginBottom: 12,
                        }}
                        dropdownIconColor={"#FFFFFF"}
                        mode='dropdown'
                        placeholder='Chọn giới tính'
                    >
                        <Picker.Item enabled={false} color={"#1d86dc"} label={"Chọn giới tính"} value="" />
                        {
                            listArray.map((it, index) => {
                                return (
                                    <Picker.Item key={index} label={it.label} value={it.value} />
                                )
                            })
                        }
                    </Picker>
                </View>

                <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
            </View>
        </KeyboardAvoidingView>
    )
};
export default SelectCommon;
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
        borderBottomWidth: 1,
    }
})