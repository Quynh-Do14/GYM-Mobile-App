import { Endpoint } from "../../../../core/common/apiLink";
import { RequestService } from "../../../utils/response";

class EmployeeService {
    async getEmloyeePT(params: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                get(Endpoint.Employee.getPT,
                    { ...params }
                ).then(response => {
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

export default new EmployeeService();
