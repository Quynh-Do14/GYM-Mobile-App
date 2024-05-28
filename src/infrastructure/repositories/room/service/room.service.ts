import { Endpoint } from "../../../../core/common/apiLink";
import { RequestService } from "../../../utils/response";

class RoomService {
    async getRoom(params: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                get(Endpoint.Room.getRoom,
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
    async getRoomById(id: number, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                get(`${Endpoint.Room.getRoomById}/${id}`,
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
                getFile(`${Endpoint.Room.getRoom}/${id}/image`).then(response => {
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
export default new RoomService();
