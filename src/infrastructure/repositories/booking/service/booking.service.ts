import { Endpoint } from "../../../../core/common/apiLink";
import { RequestService } from "../../../utils/response";

class BookingService {
    async getBooking(params: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                get(Endpoint.Booking.getBooking,
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
    async Booking(data: any, setLoading: Function, setIsMessageSuccess: Function, setIsMessageError: Function) {
        setLoading(true)
        try {
            return await RequestService.
                post(Endpoint.Booking.booking,
                    { ...data }
                ).then(response => {
                    setIsMessageSuccess(true)
                    return response;
                });
        }
        catch (error) {
            setIsMessageError(true)
        } finally {
            setLoading(false);
        }
    }
    async Workout(params: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                get(Endpoint.Booking.workout,
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
}

export default new BookingService();
