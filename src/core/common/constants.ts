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
            static DetailBranch = class {
                static value = "DetailBranch"
            }
        }
        static BookingScreen = class {
            static value = "BookingScreen"
        }
        static PracticeScreen = class {
            static value = "PracticeScreen"
        }
        static Navbar = class {
            static value = "Navbar"
        }
        static InfoUserScreen = class {
            static value = "InfoUserScreen"
            static EditProfile = class {
                static value = "EditProfile"
            }
            static BookingSchedule = class {
                static value = "BookingSchedule"
            }
            static WorkoutSessions = class {
                static value = "WorkoutSessions"
            }
        }
        static Auth = class {
            static LoginScreen = class {
                static value = "LoginScreen"
            }
            static ForgotPasswordScreen = class {
                static value = "ForgotPasswordScreen"
            }
            static ChangePasswordScreen = class {
                static value = "ChangePasswordScreen"
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
                value: "BookingSchedule",
                label: "Lịch đăng kí"
            },
            {
                value: "WorkoutSessions",
                label: "Tiến trình luyện tập"
            },
        ]
    }
    static Gender = class {
        static MALE = class {
            static value = "MALE";
            static label = "Nam";
        }
        static FEMALE = class {
            static value = "FEMALE";
            static label = "Nữ";
        }
        static List = [
            { label: "Nam", value: "MALE" },
            { label: "Nữ", value: "FEMALE" },
        ]
    }
}