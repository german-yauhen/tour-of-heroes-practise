import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  private messagesService: MessagesService

  constructor(messagesService: MessagesService) {
    this.messagesService = messagesService;
  }

  ngOnInit(): void {
  }

  public hasMessages(): boolean {
    return this.messagesService.getMessages().length > 0;
  }

  public readMessages(): string[] {
    return this.messagesService.getMessages();
  }

  public clearMessages(): void {
    this.messagesService.clear();
  }

}
