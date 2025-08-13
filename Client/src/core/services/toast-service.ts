import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor() {
    this.createToastContainer();
  }

  private createToastContainer() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-bottom toast-end';
      document.body.appendChild(container);
    }
  }


  private createToastElement(message: string, alertClass: string, duration = 5000) {
    const toastConatiner = document.getElementById('toast-container')
    if (!toastConatiner) return;

    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg');
    toast.innerHTML = `
    <span>${message}</span>
    <button class="ml-4 btn btn-sm btn-ghost">x</button>
    `

    toast.querySelector('button')?.addEventListener('click', () => {
      toastConatiner.removeChild(toast);
    })
    toastConatiner.append(toast);
    setTimeout(() => {
      if (toastConatiner.contains(toast)) {
        toastConatiner.removeChild(toast)
      }
    }, duration);
  }

  success(message: string, duration?: number) {
    this.createToastElement(message, 'alert-success', duration);
  }
  error(message: string, duration?: number) {
    this.createToastElement(message, 'alert-error', duration);
  }
  warning(message: string, duration?: number) {
    this.createToastElement(message, 'alert-warning', duration);
  }
  info(message: string, duration?: number) {
    this.createToastElement(message, 'alert-info', duration);
  }
}
