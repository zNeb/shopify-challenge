import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { start_date: startDate, end_date: endDate } = req.query;
  if (startDate && endDate) {
    const nasaData = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}&start_date=${startDate}&end_date=${endDate}`);
    const nasaJson = await nasaData.json();
    res.status(200).json(nasaJson.reverse());
    return;
  }
  res.status(500).json({ error: 'invalid input' });
}
