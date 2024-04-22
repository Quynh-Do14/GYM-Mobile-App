export default class Constants {
    static AuthTab = class {
        static List = [
            {
                label: "Đăng nhập",
                value: 1
            },
            {
                label: "Đăng kí",
                value: 2
            },
        ]
    }
    static Navigator = class {
        static HomeScreen = class {
            static value = "HomeScreen"
        }
        static BookingScreen = class {
            static value = "BookingScreen"
        }
        static PracticeScreen = class {
            static value = "PracticeScreen"
        }
        static HomeScreen = class {
            static value = "HomeScreen"
        }

        static Navbar = class {
            static value = "Navbar"
        }
        static InfoUserScreen = class {
            static value = "InfoUserScreen"
            static EditProfile = class {
                static value = "EditProfile"
            }
        }
        static Auth = class {
            static LoginScreen = class {
                static value = "LoginScreen"
            }
            static ForgotPasswordScreen = class {
                static value = "ForgotPasswordScreen"
            }
            static VerifyScreen = class {
                static value = "VerifyScreen"
            }
        }

    }

    static InfoUser = class {
        static List = [
            {
                value: "EditProfile",
                label: "Chỉnh sửa thông tin"
            },
            {
                value: 2,
                label: "Lịch đăng kí"
            },
            {
                value: 3,
                label: "Tiến trình luyện tập"
            },
        ]
    }
}