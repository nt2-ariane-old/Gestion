import axios from 'axios'

// const user = axios.create({
//     baseURL: process.env.REACT_APP_API_URL + '/user',
// })
const user = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/user',
})

export const signupUser = payload =>
    user.post(`/signup`, payload)
        .then(e => {
            console.log(e)
            return e
        })
        .catch((error) => {
            console.log(error.config);
            if (error.response) {
                return error.response.data;
            } else if (error.request) {
                return error.request;
            } else {
                return error.message;
            }
        });

export const resetPassword = payload => {
    return user.post(`/forgot-password`, payload)
        .then((e) => {
            return { success: e }
        })
        .catch((error) => {
            if (error.response) {
                return { error: error.response.data }
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error : ', error.message);
            }
            console.log(error.config);
        });

}
export const testResetToken = payload => user.get('/reset', { params: payload })
export const updatePasswordViaEmail = payload => user.put('/updatePasswordViaEmail', payload)
export const loginUser = payload => user
    .post(
        `/login`,
        payload,
        {
            validateStatus: function (status) {
                return status >= 200 && status < 400; // default
            }
        })
    .catch((error) => {
        if (error.response) {
            return error.response.data;
        } else if (error.request) {
            console.log('Request')
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
    });

export const infoUser = payload => {

    return user
        .get(`/me`, { params: {}, headers: payload })
        .then((result) => {
            return result.data
        })
        .catch((error) => {
            // Error
            if (error.response) {
                return error.response.data;
            } else if (error.request) {
                console.log('Request')
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });

}
export const addSlackInfos = payload => {

    return user
        .put(`/addSlackInfo`, payload)
        .then((result) => {
            return result.data
        })
        .catch((error) => {
            // Error
            if (error.response) {
                return error.response.data;
            } else if (error.request) {
                console.log('Request')
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });

}
export const getSlackInfos = payload => {

    return user
        .get(`/slackInfo`, { params: {}, headers: payload })
        .then((result) => {
            return result.data
        })
        .catch((error) => {
            // Error
            if (error.response) {
                return error.response.data;
            } else if (error.request) {
                console.log('Request')
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });

}

const users = {
    signupUser,
    infoUser,
    loginUser,
    resetPassword,
    testResetToken,
    updatePasswordViaEmail,
    addSlackInfos,
    getSlackInfos
}
export default users