import ApiError from "./apiError"
import { NextFunction } from "express"

export default function processCatchError(error: unknown, next: NextFunction) {
    if (typeof error === "string") {
        next(ApiError.badRequest(error))
    } else if (error instanceof Error) {
        next(ApiError.badRequest(error.message))
    }
}
