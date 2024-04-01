import crypto from 'crypto';

class DeSocket {
  private key: any;
  private iv: any;

  constructor() {
    const keyBuffer2 = Buffer.from(`${this.iv}`, 'utf8');
    const hash2 = crypto
      .createHash('sha256')
      .update(keyBuffer2)
      .digest('base64')
      .toString();

    const keyBuffer = Buffer.from(`${this.iv}`, 'utf8');
    const hash = crypto.createHash('sha256').update(keyBuffer).digest('base64');
    this.key = hash2.slice(0, 32).toString();
    this.iv = hash.slice(0, 16).toString();
  }

  en = (data: any) => {
    const cipher = crypto.createCipheriv('aes-512', this.key, this.iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  };

  de = (text: any) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
    let decrypted = decipher.update(text, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  };
}

export default DeSocket;
