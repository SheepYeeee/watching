import { Injectable } from '@angular/core';
import { Modal } from '../models/modal.model';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor() { }

    /**
     * 開啟 Modal
     *
     * @memberof ModalService
     */
    open(modalOptions: Modal) {
        $('#Modalmessage .modal-body p').text(modalOptions.message);
        $('#Modalmessage .modal-body span').attr('class', modalOptions.icon);
        $('#Modalmessage').modal('show');
    }
}
