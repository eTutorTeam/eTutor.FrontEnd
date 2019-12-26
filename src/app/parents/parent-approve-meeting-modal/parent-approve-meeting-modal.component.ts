import { Component, OnInit } from '@angular/core';
import {ModalPagesService} from "../../services/modal-pages.service";

@Component({
  selector: 'app-parent-aprrove-meeting-modal',
  templateUrl: './parent-approve-meeting-modal.component.html',
  styleUrls: ['./parent-approve-meeting-modal.component.scss'],
})
export class ParentApproveMeetingModalComponent implements OnInit {

  constructor(private modalPageService: ModalPagesService) { }

  ngOnInit() {}

  closeModal() {
    this.modalPageService.closeModal();
  }

}
