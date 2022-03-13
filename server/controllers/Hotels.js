import db from '../config/dbKnex.js';

export const getCities = async (req, res) => {

  try {
      const cities = await db('cities')
      .join('countries','cities.country_id','countries.country_id')
      .distinct('city')
      .whereRaw(`LOWER(city) LIKE ?`, [`${req.params.city.toLowerCase()}%`])
      .orderBy(['city'])
      .limit(10)
      res.json(cities)
    } catch (e) {
      res.json([{city:'no match'}])
    }
}