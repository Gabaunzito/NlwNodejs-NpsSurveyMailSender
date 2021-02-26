import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

  // http://localhost:3333/answers/1?u=77224458-bdfc-467a-b185-4e19db5bd7b6

    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if (!surveyUser) {
            throw new AppError("Survey User dows not exists!");
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser)
        
  }
}

export { AnswerController }