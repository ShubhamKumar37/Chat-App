import { ApiError, asyncHandler } from "../utils/index.js";

const validateSchema = (schema) => asyncHandler(async (req, res, next) => {
    const { error } = schema.validate(req.body);
    // if (error) throw new ApiError(400, error.details.map((detail) => detail.message).join(", "));
    if (error) throw new ApiError(400, error.message);

    next();
});

export { validateSchema };
