import { Endpoint } from "../../../../core/common/apiLink";
import { RequestService } from "../../../utils/response";

class BranchService {
    async getBranch(params: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                get(Endpoint.Branch.getBranch,
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
    async getBranchById(id: number, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                get(`${Endpoint.Branch.getBranchById}/${id}`,
                ).then(response => {
                    return response;
                });
        }
        catch (error) {
        } finally {
            setLoading(false);
        }
    }
}
export default new BranchService();
