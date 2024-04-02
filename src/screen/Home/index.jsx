import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import card1 from "../../../assets/images/Card1.png";
import card2 from "../../../assets/images/Card2.png";

const data = [
    {
        img: card1,
        title: "Wake Up Call",
        subTitle: "04 Workouts  for Beginner"
    },
    {
        img: card2,
        title: "Wake Up Call",
        subTitle: "07 Workouts  for Beginner"
    },
    {
        img: card1,
        title: "Wake Up Call",
        subTitle: "04 Workouts  for Beginner"
    },
    {
        img: card2,
        title: "Wake Up Call",
        subTitle: "07 Workouts  for Beginner"
    },
]
const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.textTitle}>Đăng ký lịch tập</Text>
                <View style={styles.content}>
                    {
                        data.map((it, index) => (
                            <View key={index}>
                                <Image
                                    source={it.img}
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
                                        {it.title}
                                    </Text>
                                    <Text
                                        style={styles.subTitle}
                                    >
                                        {it.subTitle}
                                    </Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
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
        flexDirection: "col",
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