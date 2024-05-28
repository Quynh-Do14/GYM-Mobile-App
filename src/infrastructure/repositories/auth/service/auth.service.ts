import AsyncStorage from "@react-native-async-storage/async-storage";
import { Endpoint } from "../../../../core/common/apiLink";
import { RequestService } from "../../../utils/response";
import { clearStorage, saveToken, setStorage } from "../../../utils/storage";

class AuthService {
    async login(data: object, setLoading: Function, setIsMessageError: Function) {
        setLoading(true)
        try {
            return await RequestService
                .post(Endpoint.Auth.Login, {
                    ...data
                })
                .then(response => {
                    if (response) {
                        saveToken(
                            response.token,
                        );
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            setIsMessageError(true)
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
 
    async logout(setLoading: Function) {
        setLoading(true)
        try {
            clearStorage()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        };
    };

    async register(data: any, setLoading: Function, setIsMessageSuccess: Function, setIsMessageError: Function) {
        setLoading(true)
        try {
            return await RequestService.
                post(Endpoint.Auth.Signup, {
                    ...data
                }).then(response => {
                    setIsMessageSuccess(true)
                    return response;
                });
        } catch (error) {
            setIsMessageError(true)
        } finally {
            setLoading(false);
        }
    };
    async profile(setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                get(Endpoint.Auth.Profile).then(response => {
                    return response;
                });
        }
        catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    async updateProfile(data: object, setLoading: Function, setIsMessageSuccess: Function, setIsMessageError: Function) {
        setLoading(true)
        try {
            return await RequestService.putForm(Endpoint.Auth.UpdateProfile,
                { ...data }
            ).then(response => {
                setIsMessageSuccess(true)
                return response;
            });
        }
        catch (error) {
            console.error(error)
            setIsMessageError(false)
        } finally {
            setLoading(false);
        }
    }

    async changePassword(data: object, setLoading: Function, setIsMessageSuccess: Function, setIsMessageError: Function) {
        setLoading(true)
        try {
            return await RequestService.put(Endpoint.Auth.ChangePassword,
                { ...data }
            ).then(response => {
                setIsMessageSuccess(true)
                return response;
            });
        }
        catch (error) {
            setIsMessageError(false)
        } finally {
            setLoading(false);
        }
    }

    // async verifyEmail(token, setLoading, callBack) {
    //     setLoading(true)
    //     try {
    //         return await RequestService.post(`${apiRoutes.common.auth.verify_email}/${token}`).then(
    //             (response) => {
    //                 if (response) {
    //                     SuccessMessage("Xác thực Email thành công")
    //                     return response;
    //                 }
    //             });
    //     }
    //     catch (error) {
    //         FailMessage("Xác thực không thành công", "")
    //         console.error(error)
    //     } finally {
    //         setLoading(false);
    //         callBack()
    //     }
    // }

    // async forgotPassword(email, setLoading) {
    //     setLoading(true)
    //     try {
    //         return await RequestService.post(`${apiRoutes.common.auth.forgot_password}?email=${email}`,
    //             {},
    //         ).then((response) => {
    //             if (response) {
    //                 setLoading(false)
    //                 SuccessMessage("Gửi Email thành công", "Yêu cầu thiết lập lại mật khẩu của bạn gửi thành công. Kiểm tra Email để thiết lập lại mật khẩu")
    //                 return response;
    //             }
    //         });
    //     } catch (error) {
    //         FailMessage("Gửi Email không thành công", "Kiểm tra lại thông tin Email")
    //         console.error(error)
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // async resetPassword(email, token, setLoading, setIsSuccessDialog) {
    //     setLoading(true)
    //     try {
    //         return await RequestService.post(`${apiRoutes.common.auth.reset_password}?newPassword=${email}&token=${token}`,
    //             {},
    //         ).then(response => {
    //             setLoading(false)
    //             SuccessMessage("Thay đổi mật khẩu thành công", "")
    //             setIsSuccessDialog(true)
    //             return response;
    //         });
    //     } catch (error) {
    //         FailMessage("Thay đổi mật khẩu không thành công", "Kiểm tra lại thông tin")
    //         console.error(error)
    //         setIsSuccessDialog(false)
    //     } finally {
    //         setLoading(false);
    //     }
    // }

}

export default new AuthService();
