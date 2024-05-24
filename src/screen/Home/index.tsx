import { Animated, Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MainLayout from "../../infrastructure/common/layouts/layout";
import { useEffect, useRef, useState } from "react";
import packageService from "../../infrastructure/repositories/package/service/package.service";
import { formatCurrencyVND } from "../../infrastructure/helper/helper";
import branchService from "../../infrastructure/repositories/branch/service/branch.service";
import { useNavigation } from "@react-navigation/native";
import Constants from "../../core/common/constants";
import { useRecoilState } from "recoil";
import { BranchState } from "../../core/atoms/branchState/branchState";

const { width: viewportWidth } = Dimensions.get('window');

const HomeScreen = () => {
    const [packageList, setPackageList] = useState<Array<any>>([])
    const [branchList, setBranchList] = useState<Array<any>>([])
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndexBranch, setCurrentIndexBranch] = useState(0);
    const [currentIndexPackage, setCurrentIndexPackage] = useState(0);
    const navigation = useNavigation<any>();
    const [, setBranchState] = useRecoilState(BranchState)
    const getPackageAsync = async () => {
        try {
            await packageService.getPackage(
                {
                    page: 0,
                    size: 5
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

    const getBranchAsync = async () => {
        try {
            await branchService.getBranch(
                {
                    page: 0,
                    size: 5
                },
                () => { }
            ).then((response) => {
                if (response) {
                    setBranchList(response.content)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getBranchAsync().then(() => { })
    }, [])

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const onViewableBranchChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndexBranch(viewableItems[0]?.index);
    }).current;

    const onViewableItemsPackageChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndexPackage(viewableItems[0]?.index);
    }).current;


    const onNavigateBranch = (it: any) => {
        navigation.navigate(
            Constants.Navigator.HomeScreen.DetailBranch.value,
            setBranchState({
                data: it
            })
        )
    };

    const Item = ({ it, index }: any) => {
        return (
            <Pressable
                style={styles.slide}
                key={index}
                onPress={() => onNavigateBranch(it)}
            >
                <Image
                    source={require("../../../assets/images/img-branch.jpg")}
                    style={{
                        width: viewportWidth - 20 * 2,
                        height: 150,
                        objectFit: "cover",
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
                        {it.address || formatCurrencyVND(String(it.price))}
                    </Text>
                </View>
            </Pressable>
        )
    }
    return (
        <MainLayout title={"Trang chủ"}>
            <ScrollView>
                <View style={{
                    flexDirection: "column",
                    gap: 16
                }}>
                    <View>
                        <Text style={styles.titleSlide}>Các chi nhánh</Text>
                        <FlatList
                            data={branchList}
                            renderItem={({ item, index }) => <Item it={item} index={index} />}
                            keyExtractor={item => item.id}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={handleScroll}
                            onViewableItemsChanged={onViewableBranchChanged}
                            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                        />
                        <View style={styles.pagination}>
                            {branchList.map((_, index) => (
                                <View key={index} style={[styles.dot, { opacity: currentIndexBranch === index ? 1 : 0.3 }]} />
                            ))}
                        </View>
                    </View>

                    <View>
                        <Text style={styles.titleSlide}>Gói thành viên</Text>
                        <FlatList
                            data={packageList}
                            renderItem={({ item, index }) => <Item it={item} index={index} />}
                            keyExtractor={item => item.id}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={handleScroll}
                            onViewableItemsChanged={onViewableItemsPackageChanged}
                            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                        />
                        <View style={styles.pagination}>
                            {packageList.map((_, index) => (
                                <View key={index} style={[styles.dot, { opacity: currentIndexPackage === index ? 1 : 0.3 }]} />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </MainLayout >
    )
}

export default HomeScreen
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1C1C1E",
        paddingHorizontal: 24,
        // paddingVertical: 20,
        flex: 1,

    },
    slide: {
        width: viewportWidth - 20 * 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    image: {
        width: '100%',
        height: '70%',
        borderRadius: 8,
    },

    pagination: {
        flexDirection: 'row',
        alignSelf: 'center',
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
        position: "absolute",
        bottom: 16,
        left: 16,
        backgroundColor: "#00000076",
        display: "flex",
        flexDirection: "column",
        gap: 4
    },
    titleSlide: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "700",
        textTransform: "uppercase",
        marginBottom: 8
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
    }
})