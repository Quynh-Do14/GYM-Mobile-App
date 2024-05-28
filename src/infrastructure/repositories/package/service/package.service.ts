import { Endpoint } from "../../../../core/common/apiLink";
import { RequestService } from "../../../utils/response";

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
}

export default new PackageService();
