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

export async function getGroupById(groupId) {
    const user = JSON.parse(localStorage.getItem(sessionKey))

    const response = await http.get(baseURL + "api/groups/byid?id=" + groupId, {
        headers: {
            Authorization: user.jwtToken
        }
    }
    );
    return response.data
}

export async function deleteGroup(id) {
    const user = JSON.parse(localStorage.getItem(sessionKey))
    const response = await http.delete(baseURL + "api/groups/delbyid?id=" + id, {
        headers: {
            Authorization: user.jwtToken
        }
    }
    );
    console.log(response)
    return response.data
}

export async function getAllSteps(groupId) {
    const user = JSON.parse(localStorage.getItem(sessionKey))

    const response = await http.get(baseURL + "api/steps/bygid?gid=" + groupId, {
        headers: {
            Authorization: user.jwtToken
        }
    }
    );
    // console.log(typeof(response.data.payload))
    return response.data
}

export async function getAllInterfaces() {
    const user = JSON.parse(localStorage.getItem(sessionKey))

    const response = await http.get(baseURL + "api/interfaces/all", {
        headers: {
            Authorization: user.jwtToken
        }
    }
    );
    return response.data
}

export async function createStep(formValues) {
    const user = JSON.parse(localStorage.getItem(sessionKey))
    const response = await http.post(baseURL + "api/steps/save",
        formValues, {
        headers: {
            Authorization: user.jwtToken
        }
    }
    );
    return response.data
}

export async function getStepsByGId(groupId) {
    const user = JSON.parse(localStorage.getItem(sessionKey))

    const response = await http.get(baseURL + "api/steps/bygid?gid=" + groupId, {
        headers: {
            Authorization: user.jwtToken
        }
    }
    );
    return response.data
}

export async function getStepById(stepId) {
    const user = JSON.parse(localStorage.getItem(sessionKey))

    const response = await http.get(baseURL + "api/steps/byid?id=" + stepId, {
        headers: {
            Authorization: user.jwtToken
        }
    }
    );
    return response.data
}

export async function getAllFilters(stepId) {
    const user = JSON.parse(localStorage.getItem(sessionKey))

    const response = await http.get(baseURL + "api/filters/bysid?sid=" + stepId, {
        headers: {
            Authorization: user.jwtToken
        }
    }
    );
    return response.data
}

export async function createFilter(formValues) {
    const user = JSON.parse(localStorage.getItem(sessionKey))
    const response = await http.post(baseURL + "api/filters/save",
        formValues, {
        headers: {
            Authorization: user.jwtToken
        }
    }
    );
    return response.data
}

export async function getGroupsByScheduleStatus(scheduledStatus) {
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

export async function getGroupsByRunningStatus(RunningStatus) {
    // Stopped,Terminated,Running
    const user = JSON.parse(localStorage.getItem(sessionKey));
    const response = await http.get(baseURL + "api/groups/byRunningStatus?runningstatus=" + RunningStatus,
        {
            headers: {
                Authorization: user.jwtToken
            }
        }
    );
    return response.data;
}

export async function getAllJobLogs() {
    const user = JSON.parse(localStorage.getItem(sessionKey));
    const response = await http.get(baseURL + "api/joblogs/all",
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
    getGroupById,
    deleteGroup,
    getAllSteps,
    getAllInterfaces,
    createStep,
    getStepsByGId,
    getStepById,
    getAllFilters,
    createFilter,
    getGroupsByScheduleStatus,
    getGroupsByRunningStatus,
    getAllJobLogs
}

export default schedule