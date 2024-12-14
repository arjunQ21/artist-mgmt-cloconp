const { useState, useEffect } = require("react");
const { default: useAPIFetch } = require("./useAPIFetch")

const useFetchSingle = (resourceURI = null) => {
    const { loading,  parsedResponse, fetchAPI } = useAPIFetch();

    const [singleResource, setSingleResource] = useState(null);

    
    useEffect(function () {
        fetchAPI({ uri: resourceURI });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resourceURI])

    useEffect(function () {
        if ( parsedResponse && parsedResponse.status === 'success') {
            setSingleResource(parsedResponse.data);
        } else {
            setSingleResource(null);
        }
    }, [parsedResponse])


    return {loading, parsedResponse, singleResource}
} 

export default useFetchSingle;