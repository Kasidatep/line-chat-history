import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from './config';
import fs from 'fs';
import { wait } from './utils';
import uid from './uid.json';

async function getHistoryMessage(channelId: string, userId: string): Promise<any> {
    const apiUrl = `https://chat.line.biz/download/${channelId}/${userId}/messages.csv?timezoneOffset=-420`;
    const headers = {
        Cookie: config.cookie,
    };

    try {
        const response: AxiosResponse<any> = await axios.get(apiUrl, { headers });
        const data = response.data;
        return data;
    } catch (error: any) {
        throw new Error(error.response.data.message??error.message);
    }
}

async function createNewFile(channelId: string, userId: string) {
    const response = await getHistoryMessage(channelId, userId);
    const writeToFile: string = response;
    
    fs.writeFile(config.log_filename, '\uFEFF' + writeToFile, (err) => {
        if (err) throw err;
        console.log(`Create a new CSV file [${config.log_filename}] \n [${userId} Added]: Content created to the file, with title`);
    });
}

async function appendFileWithNoTitleData(channelId: string, userId: string) {
    try {
      const response = await getHistoryMessage(channelId, userId);
      const writeToFile: string = response;
      const lines = writeToFile.split('\n');
  
      fs.appendFile(config.log_filename, '\uFEFF' + lines.slice(4).join('\n') + '\n', (err) => {
        if (err) throw err;
        console.log(`[${userId} Added]: Content appended to the file, without title`);
      });
  
    } catch (error) {
      console.error('Error:', error);
    }
}

async function writeHistoryMessage() { 
  console.log('\nGet History Message Start...')
  console.log(`Total user: ${uid.length}`);
  await wait(1000);
  let round: number = 0;
  
  for(const userId of uid)  { 
    round++;
    console.log(`Round ${round} - ${userId} preparing...`);
    const timeStart: number = new Date().getTime();
    const response = await getHistoryMessage(config.channel_id, userId);
    const writeToFile: string = response;
    const lines = writeToFile.split('\n');

    try{
      fs.appendFile(config.log_filename, '\uFEFF' + lines.slice(4).join('\n') + '\n', (err) => {
      if (err) throw err;
      const timeEnd: number = new Date().getTime();
      const timeDiffString: string = new Date(timeEnd - timeStart).toISOString().substr(11, 12);
      console.log(`[${new Date().toLocaleTimeString()} - ${userId}]: Content appended to the file [${config.log_filename}](using ${timeDiffString} to complete)`);
    });
    }catch(error){
      console.error('Error:', error);
    }
    if(round % 10 === 0){
      console.log(`\n Round ${round} of ${uid.length} -  Waiting for 10 seconds to continue...`);
      await wait(10000);
    }
  };

  console.log('Get History Message Done...')
}

// createNewFile(config.channel_id, userId);
// appendFileWithNoTitleData(config.channel_id, userId);
writeHistoryMessage();