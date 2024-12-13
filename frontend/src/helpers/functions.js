import { toaster } from "src/components/ui/toaster";

export const fetchFromApi = async (uri, options = {}) => {
    console.log({uri, options})
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + uri, options);
        let data;
        try {
            data = await response.text();
            data = JSON.parse(data)
            if (data.status === 'fail') {
                toaster.create({
                    title: "Warning",
                    description: data.message?? "Check your inputs and retry",
                    type: "warning",
                    duration: 3000
                });
            } else if (data.status === 'error') {
                toaster.create({
                    title: "Error",
                    description: data.message ?? "Server Error.",
                    type: "error",
                    duration: 3000
                });
            } else if (data.status !== 'success') {
                toaster.create({
                    title: "Server Error",
                    description: data.message ?? data.toString(),
                    type: "error",
                    duration: 3000
                });
            }
        } catch (e) {
            console.error(e)
            toaster.create({
                title: "API Error",
                description: e.message,
                type: "error",
                duration: 3000
            });
        }
        return {parsed: data, response};
    } catch (error) {
        console.error("Fetch error:", error.message);
        toaster.create({
            title: "Fetch Error",
            description: "Some error occurred with the server",
            type: "error",
            duration: 3000
        });
        return null;
    }
};
