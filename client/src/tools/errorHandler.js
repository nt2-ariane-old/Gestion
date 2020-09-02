const errorHandler = (error) => {
    let infos = null
    if (error.response) {
        console.log(error.response.data);
        if(typeof error.response.data.message !== 'undefined')
        {
            infos = error.response.data.message
        }
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        infos = 'Requête invalide'
        console.log(error.request);
    } else {
        infos = error.message
    }
    console.log(error.config);
    return infos
}
export default errorHandler