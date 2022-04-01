import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  
  /** Dynamiczna wiadomość błędu */
  @Input() errorMsg = ''

  /** Podstawowe literały dla modalu */
  @Input() modalData = {
    title: '',
    description: '',
  }
  /** Flaga informująca o wyświetlaniu pop-up z błedem */
  @Output() show = new EventEmitter<boolean>();

  constructor() { }

  /** Zamykanie modala */
  closeModal(){
    this.show.emit(false);
  }

}
