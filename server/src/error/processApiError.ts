import ApiError from "./apiError"
import { NextFunction } from "express"

export default function processApiError(status: number, error: unknown, next: NextFunction) {
    if (typeof error === "string") {
        next(ApiError.badRequest(error))
    } else if (error instanceof Error) {
        if (status === 404) {
            next(ApiError.badRequest(error.message))
        } else {
            next(ApiError.internal(error.message))
        }
    }
}
