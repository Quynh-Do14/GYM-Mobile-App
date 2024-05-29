/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { convertTimeParams, validateFields } from "../../../helper/helper";
import { MessageError } from '../controls/MessageError';
import { Picker } from '@react-native-picker/picker';
import employeeService from '../../../repositories/employee/service/employee.service';
import { useIsFocused } from '@react-navigation/native';

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
const SelectEmployeeCommon = (props: Props) => {
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
    const [valueInput, setValueInput] = useState<number>();
    const [listEmployeePT, setListEmployeePT] = useState<Array<any>>([]);

    const labelLower = label?.toLowerCase();
    const pickerRef = useRef<any>();
    const isFocused = useIsFocused();

    const validateEvent = (isImplicitChange: boolean = false) => {
        let checkValidate
        checkValidate = listEmployeePT.length;
        validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? `Vui lòng nhập ${labelLower}` : "")
    }

    const onChange = (value: number, itemIndex: number) => {

        if (listEmployeePT.length) {
            setValueInput(value);
            setData({
                [attribute]: value || ''
            });
            validateEvent(false)
        }
    };

    useEffect(() => {
        if (listEmployeePT.length == 0) {
            validateEvent(true);
        }

    }, [dataAttribute]);

    useEffect(() => {
        if (submittedTime != null) {
            validateEvent(true);
        }
    }, [submittedTime]);


    const getEmployeePTAsync = async () => {
        if (dataAttribute.bookingTime && dataAttribute.endTime) {
            const params = {
                bookingTime: convertTimeParams(dataAttribute.bookingTime),
                endTime: convertTimeParams(dataAttribute.endTime),
            }
            try {
                await employeeService.getEmloyeePT(
                    params,
                    () => { }
                ).then((response) => {
                    if (response) {
                        setListEmployeePT(response)
                    }
                })
            } catch (error) {
                console.error(error);
            }
        }

    }

    useEffect(() => {
        if (isFocused) {
            setListEmployeePT([])
        }
    }, [isFocused]);

    useEffect(() => {
        if (dataAttribute.bookingTime && dataAttribute.endTime) {
            getEmployeePTAsync().then(() => { })
        }
    }, [dataAttribute])

    if (listEmployeePT.length) {
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
                            placeholder='Chọn người hướng dẫn'
                        >
                            <Picker.Item enabled={false} color={"#1d86dc"} label={"Chọn người hướng dẫn"} value="" />
                            {
                                listEmployeePT.map((it, index) => {
                                    return (
                                        <Picker.Item key={index} label={it.name} value={it.id} />
                                    )
                                })
                            }
                        </Picker>
                    </View>

                    <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                </View>
            </KeyboardAvoidingView>
        )
    }

};
export default SelectEmployeeCommon;
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