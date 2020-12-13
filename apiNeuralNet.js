// process.env.CENSOR_API_KEY
require('dotenv').config();
const fs = require('fs');
const deepai = require('deepai'); 
deepai.setApiKey(process.env.CENSOR_API_KEY);

const FILTER_INDEX = 0.5;
const isNude = async (link) => {
    const resp = await deepai.callStandardApi('content-moderation', {
            image: link
    });
    const index = resp.output.nsfw_score;
    if(index > FILTER_INDEX)
    	return true;
    else
    	return false;
}
module.exports = {
	isNude
}