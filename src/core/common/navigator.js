
import homeIcon from "../../../assets/images/home.png";
import homeActiveIcon from "../../../assets/images/homeActive.png";
import heartIcon from "../../../assets/images/heart.png";
import heartActiveIcon from "../../../assets/images/heartActive.png";
import cartIcon from "../../../assets/images/cart.png";
import cartActiveIcon from "../../../assets/images/cartActive.png";
import notificationIcon from "../../../assets/images/notification.png";
import notificationActiveIcon from "../../../assets/images/notificationActive.png";

import HomeScreen from "../../screen/Home"
import BookingScreen from '../../screen/Booking';
import InfoUser from "../../screen/InfoUser";
import PracticeScreen from "../../screen/Practice";
import InfoUserScreen from "../../screen/InfoUser";
import Constants from "./constants";

export const publishNavigator = [

]

export const bottomNavigator = [
    {
        component: HomeScreen,
        name: Constants.Navigator.HomeScreen.value,
        unFocused: homeIcon,
        focused: homeActiveIcon
    },
    {
        component: BookingScreen,
        name: Constants.Navigator.BookingScreen.value,
        unFocused: cartIcon,
        focused: cartActiveIcon
    },
    // {
    //     component: PracticeScreen,
    //     name: Constants.Navigator.PracticeScreen.value,
    //     unFocused: notificationIcon,
    //     focused: notificationActiveIcon
    // },
    {
        component: InfoUserScreen,
        name: Constants.Navigator.InfoUserScreen.value,
        unFocused: heartIcon,
        focused: heartActiveIcon
    },
]
