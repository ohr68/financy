import { prismaClient } from "../../prisma/prisma";
import type { UpdateUserInput } from "../dtos/input/user.input";

export class UserService {

  async findUser(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id
      }
    })

    if (!user) throw new Error('Usuário não encontrado')

    return user
  }

  async updateUser(id: string, data: UpdateUserInput) {
    const user = await prismaClient.user.findUnique({
      where: {
        id
      }
    })

    if (!user) throw new Error('Usuário não encontrado')

    return prismaClient.user.update({
      where: { id },
      data: {
        name: data.name
      }
    })
  }
}