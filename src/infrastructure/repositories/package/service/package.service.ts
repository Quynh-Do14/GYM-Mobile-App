import { Alert } from "react-native";
import { Endpoint } from "../../../../core/common/apiLink";
import { RequestService } from "../../../utils/response";
import { messageConfig } from "../../../../infrastructure/helper/message";
class PackageService {
    async getPackage(params: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                get(Endpoint.Package.getPackage,
                    { ...params }
                ).then(response => {
                    return response;
                });
        }
        catch (error) {
        } finally {
            setLoading(false);
        }
    }
    async getPackageById(id: number, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                get(`${Endpoint.Package.getPackage}/${id}`,
                ).then(response => {
                    return response;
                });
        }
        catch (error) {
        } finally {
            setLoading(false);
        }
    }
    async getAvatar(id: number, setLoading: Function) {
        setLoading(true)

        try {
            return await RequestService.
                getFile(`${Endpoint.Package.getPackage}/${id}/image`).then(response => {
                    return response;
                });
        }
        catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }
    async addPackage(data: object, setLoading: Function) {
        setLoading(true)

        try {
            return await RequestService.
                post(Endpoint.Package.addPackage,
                    data
                ).then(response => {
                    return response;
                });
        }
        catch (error: any) {
            console.error(error)
            Alert.alert(`Đăng nhập không thành công`, messageConfig(error.response.data.message));
        } finally {
            setLoading(false);
        }
    }
}

export default new PackageService();
