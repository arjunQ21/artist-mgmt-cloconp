import { toaster } from "src/components/ui/toaster";

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
            if (response.status >= 400 && response.status < 500) {
                toaster.create({
                    title: "Warning",
                    description: data.message?? "Check your inputs and retry",
                    type: "warning",
                    duration: 3000
                });
            }else if (response.status >= 500 && response.status < 600) {
                toaster.create({
                    title: "Error",
                    description: data.message ? data.message : "Error with API Call",
                    type: "error",
                    duration: 3000
                });
            }
        } 
        return {parsed: data, response};
    } catch (error) {
        console.error("Fetch error:", error.message);
        toaster.create({
            title: "Error",
            description: "Some error occurred with the server",
            type: "error",
            duration: 3000
        });
        return null;
    }
};