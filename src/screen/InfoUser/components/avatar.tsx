import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useRecoilValue } from 'recoil';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import { convertDateOnly } from '../../../infrastructure/helper/helper';

const Avatar = () => {
    const dataProfile = useRecoilValue(ProfileState);
    return (
        <View style={styles.headerPart}>
            <View style={[
                styles.flex1,
                {
                    display: 'flex',
                    flexDirection: "row",
                    justifyContent: "flex-start"
                }
            ]}>
                <View style={styles.leftPart}>
                    <Image
                        source={dataProfile?.data?.avatar ? { uri: dataProfile?.data?.avatar } : require("../../../../assets/images/avatar.png")}
                        resizeMode={"contain"}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50
                        }}
                    />
                    <Text style={styles.nameUser}>{dataProfile?.data?.name}</Text>
                </View>
            </View>
            <View style={[
                styles.flex1,
                {
                    borderLeftWidth: 1,
                    borderLeftColor: "#2C2C2E",
                    padding: 20
                }
            ]}>
                <Text style={styles.textLabel}>Ngày tham gia: </Text>
                <Text style={styles.textDate}>{convertDateOnly(dataProfile.data.createdAt)} </Text>
            </View>
        </View>
    )
}

export default Avatar
const styles = StyleSheet.create({
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flex1: {
        flex: 1
    },
    headerPart: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    leftPart: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",

    },
    nameUser: {
        color: "#FFFFFF",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 20,
        marginTop: 8
    },
    textLabel: {
        color: "#FFFFFF",
        fontFamily: "Roboto Regular",
        fontWeight: "400",
        fontSize: 12,
        marginBottom: 4
    },
    textDate: {
        color: "#FFFFFF",
        fontFamily: "Roboto Regular",
        fontWeight: "600",
        fontSize: 16,
    },
})