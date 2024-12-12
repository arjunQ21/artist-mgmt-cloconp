const { useState, useEffect } = require("react");
const { fetchFromApi } = require("src/helpers/functions");


const useAPIFetch = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [requestData, setRequestData] = useState({ uri: null, options: {} })
    const [parsedResponse, setParsedResponse] = useState(null);
    function apiErrorInField (fieldName) {
        if (!parsedResponse) return {}
        if (!parsedResponse.error) return {};
        if (parsedResponse.error.hasOwnProperty(fieldName)) {
            return {
                invalid: true,
                errorText: parsedResponse.error[fieldName]
            }
        }
    }
    useEffect(() => {
        if (!requestData.uri) return;
        setLoading(true)
        fetchFromApi(requestData.uri, requestData.options)
            .then(resp => {
                setResponse(resp.response); setLoading(false);
                setParsedResponse(resp.parsed);
            })
            .catch(e => {
                setResponse(null); setLoading(false);
            })
    }, [requestData])

    return { loading, response, parsedResponse, fetchAPI: setRequestData, apiErrorInField }

}

export default useAPIFetch