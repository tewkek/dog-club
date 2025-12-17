import axios from 'axios';

const endpoint = process.env.REACT_APP_ROBOFLOW_ENDPOINT;
const apiKey = process.env.REACT_APP_ROBOFLOW_API_KEY;

export async function recognizeDogBase64(base64Image) {
  if (!endpoint || !apiKey) {
    throw new Error('Roboflow .env не настроен');
  }
  const res = await axios({
    method: 'POST',
    url: endpoint,
    params: { api_key: apiKey },
    data: base64Image,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return res.data;
}
