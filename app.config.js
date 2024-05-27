try {
    require('dotenv').config()
} catch { }

module.exports = ({ config }) => {
    //console.log("Name: " + config.name);
    const url = process.env.API_URL?.trim();
    const env = process.env.APP_ENV?.trim();
    const urlTest = process.env.API_URL_FALSE?.trim();
    const apiKey = process.env.API_KEY?.trim();

    try {
        if (!new URL(url)) {
            throw Error("No Api Url Provided");
        }
    } catch (e) {
        console.error("\x1b[31m", "****Please provide a valid API_URL. Create a .env file in project root and put this line -> \"API_URL=YOUR_VALID_API_URL\"");
        throw e;
    }

    return {
        ...config,
        extra: {
            ...config.extra,
            apiUrl: url,
            apiKey: apiKey,
            apiUrlFalse: urlTest,
            appEnv: env,
        }
    };
};