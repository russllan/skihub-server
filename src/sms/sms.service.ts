import { Injectable, Logger } from '@nestjs/common';
import * as https from 'https';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  async sendSms(phoneNumber: string, message: string) {
    const login = 'russllan';
    const password = 'bFCa1X6n';
    const transactionId = uuidv4(); // Уникальный идентификатор транзакции
    const sender = 'SMSPRO.KG';

    const xmlData = `
      <?xml version="1.0" encoding="UTF-8"?>
      <message>
          <login>${login}</login>
          <pwd>${password}</pwd>
          <id>${transactionId}</id>
          <sender>${sender}</sender>
          <text>${message}</text>
          <phones>
              <phone>${phoneNumber}</phone>
          </phones>
      </message>
    `;

    this.logger.debug(`Sending the following XML data:\n${xmlData}`);

    const options = {
      hostname: 'smspro.nikita.kg',
      path: '/api/message',
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
        'Content-Length': Buffer.byteLength(xmlData),
      },
      agent: new https.Agent({ keepAlive: true }), // Поддержка keep-alive
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let responseData = '';

        this.logger.debug(`Status code: ${res.statusCode}`);
        this.logger.debug(`Headers: ${JSON.stringify(res.headers)}`);

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          this.logger.log('Response from SMS API:', responseData);

          if (res.statusCode === 200) {
            resolve(responseData);
          } else {
            reject(new Error(`Failed with status code ${res.statusCode}: ${responseData}`));
          }
        });
      });

      req.on('error', (error) => {
        this.logger.error('Error sending SMS:', error.message);
        reject(error);
      });

      req.write(xmlData);
      req.end();
    });
  }
}
