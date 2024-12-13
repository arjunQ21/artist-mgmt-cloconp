// object that structures the response in a fixed way, based on this standardization: https://github.com/omniti-labs/jsend

class Jsend {
    constructor (status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data
    }

     toJSON = () => {
         return {
             status: this.status,
             message: this.message?.toString(),
             data: this.data
        }
     }
    
    // static methods to create this object according to 3 statuses: success, fail, error
    static success (data, message) {
        return new Jsend('success', message, data).toJSON();
    }

    static error (errorDescription) {
        const message = errorDescription instanceof Error ? errorDescription.message : errorDescription
        return new Jsend("error", message ?? "Server Error", errorDescription).toJSON()
    }

    static fail (errorFields, message) {
        return new Jsend("fail", (message ?? "Invalid API Request").toString(), errorFields ).toJSON()
    }

}

export default Jsend