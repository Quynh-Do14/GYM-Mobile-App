import React, { useEffect, useState } from 'react'
import MainLayout from "../../../infrastructure/common/layouts/layout";
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { BranchState } from '../../../core/atoms/branchState/branchState';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import branchService from '../../../infrastructure/repositories/branch/service/branch.service';


const DetailBranch = () => {
    const [detailBranch, setDetailBranch] = useState<any>({})
    const navigation = useNavigation();
    const branchState = useRecoilValue(BranchState).data
    const onGoBack = () => {
        navigation.goBack();
    }

    const getBranchByIdAsync = async () => {
        try {
            await branchService.getBranchById(
                Number(branchState.id),
                () => { }
            ).then((response) => {
                if (response) {
                    setDetailBranch(response)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getBranchByIdAsync().then(() => { })
    }, [])

    return (
        <MainLayout
            title={""}
            isBackButton={true}
            onGoBack={onGoBack}
            bgImg={require("../../../../assets/images/img-branch.jpg")}
        >
            <View style={styles.container}>
                <ScrollView>
                    <View style={{
                        flexDirection: "column",
                        gap: 16
                    }}>
                        <View
                            style={styles.card}
                        >
                            <Text
                                style={styles.title}
                            >
                                {detailBranch.branchGymName}
                            </Text>
                            <Text
                                style={styles.subTitle}
                            >
                                {detailBranch.address}
                            </Text>
                        </View>
                        <View>
                            
                        </View>
                        <View>
                            <Text style={styles.description}>
                                Want your body to be healthy. Join our program with directions according to body’s goals. Increasing physical strength is the goal of strenght training. Maintain body fitness by doing physical exercise at least 2-3 times a week.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </MainLayout>
    )
}

export default DetailBranch;
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1C1C1E",
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderRadius: 20,
        marginTop: -60
    },

    textTitle: {
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: "Roboto Regular",
        fontWeight: "700",
        fontSize: 20,
        marginBottom: 20
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#ebebeb',
        margin: 8,
    },
    card: {
        // position: "absolute",
        // bottom: 16,
        // left: 16,
        display: "flex",
        flexDirection: "column",
        gap: 4
    },
    title: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "600",
    },
    subTitle: {
        fontSize: 13,
        color: "#D0FD3E",
        fontWeight: "600"
    },
    description: {
        fontSize: 14,
        color: "#FFFFFF",
        fontWeight: "500",
    }
})