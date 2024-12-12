const { useState, useEffect } = require("react");
const { fetchFromApi } = require("src/helpers/functions");

const useAPIFetch = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [requestData, setRequestData] = useState({uri: null, options: {}})

    function apiErrorInField (fieldName) {
        if (!response) return {}
        if (!response.error) return {};
        if (response.error.hasOwnProperty(fieldName)) {
            return {
                invalid: true,
                errorText: response.error[fieldName]
            }
        }
    }

    useEffect(() => {
        if (!requestData.uri) return;
        setLoading(true)
        fetchFromApi(requestData.uri, requestData.options)
            .then(resp => { setResponse(resp); setLoading(false); })
            .catch(e => { setResponse(null); setLoading(false); })
    }, [requestData])

    return {loading, response, fetchAPI: setRequestData, apiErrorInField }

}

export default useAPIFetch