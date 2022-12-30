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

export async function updateSequence(formValues) {
    const user = JSON.parse(localStorage.getItem(sessionKey))
    const response = await http.post(baseURL + "api/steps/updateSequence",
        formValues, {
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

export async function deleteStep(id) {
    const user = JSON.parse(localStorage.getItem(sessionKey))
    const response = await http.delete(baseURL + "api/steps/delbyid?id=" + id, {
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

export async function deleteFilter(id) {
    const user = JSON.parse(localStorage.getItem(sessionKey))
    const response = await http.delete(baseURL + "api/filters/delbyid?id=" + id, {
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

export async function getJoblogReportsAll() {
    const user = JSON.parse(localStorage.getItem(sessionKey));
    const response = await http.get(baseURL + "api/joblogs/report",
        {
            headers: {
                Authorization: user.jwtToken
            }
        }
    );
    return response.data;
}

export async function getJoblogReportsQueries(start_date, end_date, gid, iid, job_status) {
    // start_date, end_date, gid, iid, job_status, job_id
    const user = JSON.parse(localStorage.getItem(sessionKey));
    // const response = await http.get(baseURL + "api/joblogs/report?jobstatus=" + job_status + "&jobid=" + job_id + "&gid=" + gid + "&iid=" + iid + "&from=" + start_date + "&to=" + end_date,
    const response = await http.get(baseURL + "api/joblogs/report?jobstatus=" + job_status + "&gid=" + gid + "&iid=" + iid + "&from=" + start_date + "&to=" + end_date,
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

export async function schedulerStart(groupId) {
    const user = JSON.parse(localStorage.getItem(sessionKey))

    const response = http.get(baseURL + "api/scheduler/start?gid=" + groupId, {
        headers: {
            Authorization: user.jwtToken
        }
    }
    );
    return await response.data;
}


const schedule = {
    //Groups
    createGroup,
    getGroupById,
    deleteGroup,
    //Steps
    getAllSteps,
    getAllInterfaces,
    createStep,
    updateSequence,
    getStepById,
    deleteStep,
    // Filters
    getAllFilters,
    createFilter,
    deleteFilter,
    //Logs
    getGroupsByScheduleStatus,
    getGroupsByRunningStatus,
    getJoblogReportsAll,
    getJoblogReportsQueries,
    getAllJobLogs,
    //processes
    schedulerStart
}

export default schedule