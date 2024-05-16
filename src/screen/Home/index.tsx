import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MainLayout from "../../infrastructure/common/layouts/layout";
import { useEffect, useState } from "react";
import packageService from "../../infrastructure/repositories/package/service/package.service";

const data = [
    {
        img: "../../../assets/images/Card1.png",
        title: "Wake Up Call",
        subTitle: "04 Workouts  for Beginner"
    },
    {
        img: "../../../assets/images/Card2.png",
        title: "Wake Up Call",
        subTitle: "07 Workouts  for Beginner"
    },
    {
        img: "../../../assets/images/Card1.png",
        title: "Wake Up Call",
        subTitle: "04 Workouts  for Beginner"
    },
    {
        img: '../../../assets/images/Card2.png',
        title: "Wake Up Call",
        subTitle: "07 Workouts  for Beginner"
    },
]
const HomeScreen = () => {
    const [packageList, setPackageList] = useState<Array<any>>([])
    const getPackageAsync = async () => {
        try {
            await packageService.getPackage(
                {
                    page: 0,
                    size: 10
                },
                () => { }
            ).then((response) => {
                if (response) {
                    setPackageList(response.content)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getPackageAsync().then(() => { })
    }, [])
    return (
        <MainLayout title={"Trang chủ"}>
            <ScrollView>
                <View style={styles.content}>
                    {
                        packageList.map((it, index) => (
                            <View key={index}>
                                <Image
                                    source={require("../../../assets/images/Card1.png")}
                                    style={{
                                        position: "relative",
                                        width: "100%",
                                        borderRadius: 20
                                    }}
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
                                        {it.price} VNĐ
                                    </Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </MainLayout>
    )
}

export default HomeScreen
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
    card: {
        position: "absolute",
        bottom: 16,
        left: 16,
        backgroundColor: "#00000063",
        display: "flex",
        flexDirection: "column",
        gap: 4
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