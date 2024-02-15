const password = 'testpassword';
const USER_DB = 'frontierDB';

/*
export const BACKEND_URL = `mongodb+srv://mmc9967:${password}@frontier.5dsrn7a.mongodb.net/${USER_DB}?retryWrites=true&w=majority` //'http://localhost:8000';
*/

export const BACKEND_URL = process.env.REACT_APP_URL_PRE;