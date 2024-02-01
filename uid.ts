import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import config from './config';

async function getFollowersIds(next: (string | undefined) = undefined) {
    const apiUrl = 'https://api.line.me/v2/bot/followers/ids';
    const queryParams: { limit: number, start?: string } = {
        limit: 1000
    }
    if (next) {
        queryParams.start = next;
    }
    const headers = {
        Authorization: `Bearer ${config.channel_access_token}`
    }

    try{
        const response = await axios.get(apiUrl, { headers, params: queryParams,})
        const { data } = response;
        return data.data;    
    } catch (error: any) {
        throw Error(error.response.data.message);
    }
}

async function writeUid() {
    try {
        const result: any[] = [];
        let data;
        let next = undefined;
        do {
            const response = await getFollowersIds(next);
            data = response?.userIds;
            if (data) {
                for (const i of data) {
                    result.push(i);
                }
                console.log(data);
            }

            if(data?.next) {
                next = data.next;
            }

        } while (next !== undefined);

        // write to json file
        fs.writeFile('uid.json', JSON.stringify(result), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    } catch (error: any) {
        console.error('Error:', error.message);
    }
}

writeUid();


