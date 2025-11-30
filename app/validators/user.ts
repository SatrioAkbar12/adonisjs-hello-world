import User from '#models/user'
import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    'full_name': vine.string().trim(),
    'email': vine.string().email().trim().toLowerCase().unique({
      table: User.table,
      column: User.$getColumn('email')?.columnName || 'email',
    }),
    'password': vine.string().minLength(8).confirmed(),
  })
)

export const updateUserValidator = /*(userId: number) =>*/ vine.compile(
  vine.object({
    'full_name': vine.string().trim().optional(),
    'email': vine.string().email().trim().toLowerCase()
      // .unique( async (value) => {
      //     const exists = await Database
      //       .from(User.table)
      //       .where(User.$getColumn('email')!.columnName, value)
      //       .andWhere('id', '!=', userId)
      //       .first()

      //   return !exists
      // })
      .optional(),
    'password': vine.string().minLength(8).confirmed().optional(),
  })
)
