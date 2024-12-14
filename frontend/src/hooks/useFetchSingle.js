const { useState, useEffect } = require("react");
const { default: useAPIFetch } = require("./useAPIFetch")

const useFetchSingle = (resourceURI = null) => {

    const [fetchingURI, setFetchingURI] = useState(resourceURI)

    const { loading,  parsedResponse, fetchAPI } = useAPIFetch();

    const [singleResource, setSingleResource] = useState(null);

    
    useEffect(function () {
        if (!fetchingURI) {
            console.log("Aborting fetching single URI.");
            return;
        }
        fetchAPI({ uri: fetchingURI });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchingURI])

    useEffect(function () {
        if ( parsedResponse && parsedResponse.status === 'success') {
            setSingleResource(parsedResponse.data);
        } else {
            setSingleResource(null);
        }
    }, [parsedResponse])


    return {loading, parsedResponse, singleResource, fetchSingle: setFetchingURI}
} 

export default useFetchSingle;