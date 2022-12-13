import { baseURL } from '../helpers/config';
import http from './httpService'

const sessionKey = "user";

export async function createGroup(formValues) {
    const user = JSON.parse(localStorage.getItem(sessionKey))
    const response = await http.post(baseURL + "api/groups/save",
        formValues, {
        headers: {
            Authorization: user.jwtToken
        }
    }
    );
    return response.data
}

export const getGroupsByScheduleStatus = async (scheduledStatus) => {
    const user = JSON.parse(localStorage.getItem(sessionKey));
    const response = await http.get(baseURL + "api/groups/byScheduledStatus?scheduledstatus=" + scheduledStatus,
        {
            headers: {
                Authorization: user.jwtToken
            }
        }
    );
    return response.data;
}


const schedule = {
    createGroup,
    getGroupsByScheduleStatus
}

export default schedule