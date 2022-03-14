import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5500,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY,
};
