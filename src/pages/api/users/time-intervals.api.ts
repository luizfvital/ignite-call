import { prisma } from '@/lib/prisma'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinuts: z.number(),
      endTimeInMinuts: z.number(),
    }),
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).json({ message: 'You must be logged in.' })
  }

  const { intervals } = timeIntervalsBodySchema.parse(req.body)

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinuts,
          time_end_in_minutes: interval.endTimeInMinuts,
          user_id: session.user.id,
        },
      })
    }),
  )

  return res.json(session)
}
