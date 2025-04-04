import toast from "react-hot-toast";


export const toastHanlder = async (res, successMessage = "Success", errorMessage = "Error", loadingMessage = "Loading") => {
    const toastId = toast.loading(loadingMessage);
    try {
        const response = await res;
        console.log("This is the response = ", response);
        if (response.status === 200) {
            toast.success(successMessage);
            toast.dismiss(toastId);
        }
        return response;
    }
    catch (error) {
        console.log("This is the error = ", error);
        toast.error(errorMessage);
    }
    finally {
        toast.dismiss(toastId);
    }
}