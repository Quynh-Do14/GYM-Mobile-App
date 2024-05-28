import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import MainLayout from '../../infrastructure/common/layouts/layout'
import branchService from '../../infrastructure/repositories/branch/service/branch.service'
import { useNavigation } from '@react-navigation/native';
import Constants from '../../core/common/constants';
import { useRecoilState } from 'recoil';
import { BranchState } from '../../core/atoms/branchState/branchState';
import LoadingFullScreen from '../../infrastructure/common/components/controls/loading';
import Entypo from 'react-native-vector-icons/Entypo';

const { width: viewportWidth } = Dimensions.get('window');
const { height: viewportHeight } = Dimensions.get('window');

const BranchScreen = () => {
    const [listBranch, setListBranch] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const navigation = useNavigation<any>();
    const [, setBranchState] = useRecoilState(BranchState)

    const onGoBack = () => {
        navigation.goBack();
    }
    const getListBranchAsync = async () => {
        try {
            await branchService.getBranch(
                {},
                setLoading
            ).then((response) => {
                if (response) {
                    setListBranch(response.content)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getListBranchAsync().then(() => { })
    }, []);

    const onNavigateBranch = (it: any) => {
        navigation.navigate(
            Constants.Navigator.Branch.DetailBranchScreen.value,
            setBranchState({
                data: it
            })
        )
    };

    return (
        <MainLayout
            title={"Chi nhánh"}
            isBackButton={true}
            onGoBack={onGoBack}
        >
            <ScrollView>
                <View style={styles.content}>
                    {
                        listBranch.map((it, index) => (
                            <Pressable
                                key={index}
                                onPress={() => onNavigateBranch(it)}
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
                                        <Entypo name="location" size={16} color="#D0FD3E" /> {it.address}
                                    </Text>
                                </View>
                            </Pressable>
                        ))
                    }
                </View>
            </ScrollView>
            <LoadingFullScreen loading={loading} />
        </MainLayout>
    )
}

export default BranchScreen;
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