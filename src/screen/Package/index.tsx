import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import MainLayout from '../../infrastructure/common/layouts/layout'
import branchService from '../../infrastructure/repositories/branch/service/branch.service'
import { useNavigation } from '@react-navigation/native';
import Constants from '../../core/common/constants';
import { useRecoilState } from 'recoil';
import LoadingFullScreen from '../../infrastructure/common/components/controls/loading';
import Entypo from 'react-native-vector-icons/Entypo';
import packageService from '../../infrastructure/repositories/package/service/package.service';
import { formatCurrencyVND } from '../../infrastructure/helper/helper';
import Foundation from 'react-native-vector-icons/Foundation';
import { PackageState } from '../../core/atoms/package/packageState';

const { width: viewportWidth } = Dimensions.get('window');
const { height: viewportHeight } = Dimensions.get('window');

const PackageScreen = () => {
    const [listPackage, setListPackage] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const navigation = useNavigation<any>();
    const [, setPackageState] = useRecoilState(PackageState)

    const onGoBack = () => {
        navigation.goBack();
    }
    const getListPackageAsync = async () => {
        try {
            await packageService.getPackage(
                {},
                setLoading
            ).then((response) => {
                if (response) {
                    setListPackage(response.content)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getListPackageAsync().then(() => { })
    }, []);

    const onNavigatePackage = (it: any) => {
        navigation.navigate(
            Constants.Navigator.Package.DetailPackageScreen.value,
            setPackageState({
                data: it
            })
        )
    };

    return (
        <MainLayout
            title={"Gói dịch vụ"}
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
                                Chưa có gói thành viên nào !!
                            </Text>
                        </View>
                }
            </ScrollView>
            <LoadingFullScreen loading={loading} />
        </MainLayout>
    )
}

export default PackageScreen;
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
        gap: 20
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
        backgroundColor: "#000000dd",
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