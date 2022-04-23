import {BadRequestError, NotFoundError} from "../errors";
import StatusCodes from "http-status-codes";
import Court from "../models/Court";

const createCourt = async (req, res) => {
    const {courtName, courtType, inService} = req.body

    if (!courtName || !courtType || !inService) {

        throw new BadRequestError("Please provide all values")
    }
    req.body.createdBy = req.user.userId
    const court = await Court.create(req.body)
    res.status(StatusCodes.CREATED).json({court})
}

const updateCourt = async (req, res) => {
    const {id: courtId} = req.params
    const {courtName, courtType, inService} = req.body

    if (!courtName || !courtType || !inService) {
        throw new BadRequestError('Please provide all values')
    }

    const court = await Court.findOne({_id: courtId})

    if (!court) {
        throw new NotFoundError(`No court with id: ${courtId}`)
    }
    const updatedCourt = await Court.findOneAndUpdate({_id: courtId}, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(StatusCodes.OK).json({updatedCourt})
}

const deleteCourt = async (req, res) => {
    const {id: courtId} = req.params

    const court = await Court.findOne({_id: courtId})

    if (!court) {
        throw new NotFoundError(`No court with id: ${courtId}`)
    }
    await court.remove()

    res.status(StatusCodes.OK).json({msg: 'Success! Court has been removed'})
}

export {createCourt, updateCourt, deleteCourt}