import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isAuthenticated: boolean = false;
  @Output() auth: EventEmitter<boolean> = new EventEmitter();
  @Output() user: EventEmitter<string> = new EventEmitter();

  login: FormGroup = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.pattern('admin'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('1234'),
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.isAuthenticated = true;
    this.auth.emit(this.isAuthenticated);
    this.user.emit(this.login.controls['userName'].value);
  }
}
