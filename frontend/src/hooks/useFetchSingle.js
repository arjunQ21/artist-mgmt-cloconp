const { useState, useEffect } = require("react");
const { default: useAPIFetch } = require("./useAPIFetch")

const useFetchSingle = (resourceURI = null) => {
    const { loading,  parsedResponse, fetchAPI } = useAPIFetch();

    const [singleResource, setSingleResource] = useState(null);

    fetchAPI({ uri: resourceURI });

    useEffect(function () {
        if (parsedResponse.status === 'success') {
            setSingleResource(parsedResponse.data);
        } else {
            setSingleResource(null);
        }
    }, [parsedResponse])


    return {loading, parsedResponse, singleResource}
} 

export default useFetchSingle;