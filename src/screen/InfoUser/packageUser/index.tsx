import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useRecoilState, useRecoilValue } from 'recoil';
import LoadingFullScreen from '../../../infrastructure/common/components/controls/loading'
import MainLayout from '../../../infrastructure/common/layouts/layout'
import Foundation from 'react-native-vector-icons/Foundation';
import Constants from '../../../core/common/constants';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import { PackageState } from '../../../core/atoms/package/packageState';
import { formatCurrencyVND } from '../../../infrastructure/helper/helper';

const { width: viewportWidth } = Dimensions.get('window');
const { height: viewportHeight } = Dimensions.get('window');

const PackageUser = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [listPackage, setListPackage] = useState<Array<any>>([]);

    const navigation = useNavigation<any>();
    const profileState = useRecoilValue(ProfileState).data;
    const [, setPackageState] = useRecoilState(PackageState)


    const onGoBack = () => {
        navigation.goBack();
    }

    const onNavigatePackage = (it: any) => {
        navigation.navigate(
            Constants.Navigator.Package.DetailPackageScreen.value,
            setPackageState({
                data: it
            })
        )
    };


    useEffect(() => {
        if (profileState?.packs) {
            setListPackage(profileState.packs)
        }
    }, [profileState]);
    console.log("profileState", profileState);

    return (
        <MainLayout
            title={"Gói thành viên"}
            isBackButton={true}
            onGoBack={onGoBack}
        >
            <ScrollView>
                {
                    listPackage && listPackage.length
                        ?
                        <View style={styles.content}>
                            {
                                listPackage && listPackage.length && listPackage.map((it, index) => (
                                    <Pressable
                                        key={index}
                                        onPress={() => onNavigatePackage(it)}
                                    >
                                        <Image
                                            source={{ uri: `data:image/jpeg;base64,${it?.image.data}` }}
                                            style={styles.imgBranch}
                                        />
                                        <View
                                            style={styles.card}
                                        >
                                            <Text
                                                style={styles.title}
                                            >
                                                {it.name}
                                            </Text>
                                            <Text
                                                style={styles.subTitle}
                                            >
                                                <Foundation name="pricetag-multiple" size={16} color="#D0FD3E" /> {formatCurrencyVND(String(it.price))}
                                            </Text>
                                        </View>
                                    </Pressable>
                                ))
                            }
                        </View>
                        :
                        <View>
                            <Text style={[
                                {
                                    textAlign: "center",
                                    paddingVertical: 40,
                                    paddingHorizontal: 10
                                },
                                styles.title
                            ]}>
                                Bạn chưa đăng ký gói thành viên !!</Text>
                        </View>
                }

            </ScrollView>
            <LoadingFullScreen loading={loading} />
        </MainLayout>
    )
}

export default PackageUser
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1C1C1E",
        paddingHorizontal: 24,
        paddingVertical: 20
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    textTitle: {
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 20,
        marginBottom: 20
    },
    content: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
    },
    imgBranch: {
        width: viewportWidth - 20 * 2,
        height: viewportHeight / 4,
        borderRadius: 20,
    },
    card: {
        position: "absolute",
        bottom: 16,
        left: 16,
        backgroundColor: "#00000063",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    title: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "700",
    },
    subTitle: {
        fontSize: 12,
        color: "#D0FD3E",
        fontWeight: "600"
    }
})