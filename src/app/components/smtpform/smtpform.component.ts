import {Component, OnInit} from '@angular/core';
import { lang} from "../../data/lang";
import {DataStorageService} from "../../services/data.storage.service";
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-smtpform',
  templateUrl: './smtpform.component.html',
  styleUrl: './smtpform.component.scss'
})
export class SmtpformComponent implements OnInit {
  constructor(public dataService: DataStorageService) {
  }

  protected readonly lang = lang;

  async send() {
    await emailjs.send("service_vg1cg7t","template_6o9rkdt",{
      name: this.dataService.get("nameOfUser"),
      nomer: this.dataService.get("emailOfUser"),
      messendger: this.dataService.get("messagerOfUser"),
    });
    alert("Message sent!");
  }

  ngOnInit() {
    emailjs.init("3cnB8WXRMbrZy441O");
  }
}
