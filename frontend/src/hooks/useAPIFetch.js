import { useSelector } from "react-redux";

const { useState, useEffect } = require("react");
const { fetchFromApi } = require("src/helpers/functions");


const useAPIFetch = () => {
    const [defaultHeaders, setDefaultHeaders] = useState({
        'Content-Type': "application/json"
    });
    const authUser = useSelector(store => store.auth)
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [requestData, setRequestData] = useState({ uri: null, options: {} })
    const [parsedResponse, setParsedResponse] = useState(null);
    function apiErrorInField (fieldName) {
        if (!parsedResponse) return {}
        if (parsedResponse.status === 'fail' && parsedResponse.data) {
            if (parsedResponse.data.hasOwnProperty(fieldName)) {
                return {
                    invalid: true,
                    errorText: parsedResponse.data[fieldName]
                }
            }

        } else return {};
    }

    useEffect(() => {

        setDefaultHeaders((df) => ({ ...df, ...{ 'Authorization': "Bearer " + authUser?.token } }));

    }, [authUser])

    useEffect(() => {
        if (!requestData.uri) return;
        setLoading(true)
        let updatedOptions = requestData.options ?? {};
        updatedOptions['headers'] = { ...defaultHeaders, ...updatedOptions['headers'] }
        // console.log({updatedOptions})
        fetchFromApi(requestData.uri, updatedOptions)
            .then(resp => {
                setResponse(resp.response); setLoading(false);
                setParsedResponse(resp.parsed);
            })
            .catch(e => {
                setResponse(null); setLoading(false);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestData])

    return { loading, response, parsedResponse, fetchAPI: setRequestData, apiErrorInField }

}

export default useAPIFetch