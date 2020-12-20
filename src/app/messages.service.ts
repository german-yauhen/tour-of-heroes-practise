import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messages: string[] = [];

  constructor() { }

  public add(message: string): void {
    this.messages.push(message);
  }

  public getMessages(): string[] {
    return this.messages;
  }

  public clear(): void {
    this.messages = [];
  }

}
