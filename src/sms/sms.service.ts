import { Injectable, Logger } from '@nestjs/common';
import { CreateSmDto } from './dto/create-sm.dto';
import { UpdateSmDto } from './dto/update-sm.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  constructor(private readonly httpService: HttpService) {}
  
  async sendSms(phoneNumber: string, message: string) {
    const login = 'russllan';
    const password = 'bFCa1X6n';
    const transactionId = 'A88726';
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

    const url = 'http://smspro.nikita.kg/api/message';

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, xmlData, {
          headers: {
            'Content-Type': 'application/xml',
          },
        })
      );

      this.logger.log('Response from SMS API:', response.data);

      return response.data;
    } catch (error) {
      this.logger.error('Error sending SMS:', error.response ? error.response.data : error.message);
      throw error;
    }

  }

}
