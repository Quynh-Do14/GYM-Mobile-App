export class Endpoint {
    static Auth = class {
        // static Login = "/auth/login";
        // static Login = "/api/login-username"
        // static Register = "/api/signup"
        static Login = "/login"
        static Signup = "/signup"
        static Profile = "/profile"
        static UpdateProfile = "/profile/update"
        static ChangePassword = "/profile/change-password"
    }
    static Employee = class {
        static getPT = "/bookings/add"
    }
    static Booking = class {
        static getBooking = "/bookings"
        static booking = "/bookings/add"
        static workout = "/workout-sessions"
    }
    static Package = class {
        static getPackage = "/packages"
    }
    static Branch = class {
        static getBranch = "/gym-branches"
        static getBranchById = "/gym-branches/admin"
    }
};