export const fetchFromApi = async (uri, options = {}) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + uri, options);
        let data;
        try {
            data = await response.text();
            data = JSON.parse(data)
        } catch (e) {
            console.log("Response is not JSON: ", data);
        }
        if (!response.ok) {
            // throw new Error(`HTTP error! status: ${response.status}`);
            console.log("HTTP Error: ", data)
        }
        return data;
    } catch (error) {
        console.error("Fetch error:", error.message);
        //   throw error; 
        return null;
    }
};