import { ApiError } from "../utils/index.js";

const ErrorHandler = (err, req, res, _) => {
    if (err instanceof ApiError || err instanceof Error) {
        console.log(err);
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    }
}

export { ErrorHandler };