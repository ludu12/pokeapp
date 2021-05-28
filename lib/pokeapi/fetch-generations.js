import axios from 'axios';
import { ApiUrl, Queries } from './queries';

export async function fetchGenerations() {
  try {
    const response = await axios.post(
      ApiUrl,
      {
        query: Queries.fetchGenerations
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      errors: response.data.errors,
      generations: response.data.data?.pokemon_v2_generation || []
    };
  } catch (e) {
    console.error(e);
    return { errors: [e], generations: [] };
  }
}
