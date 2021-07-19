import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
    // const text = "1234";
    // let encrypted_value = this.AESService.AESEncrypt(text, "pt981105123");
    // console.log("Encrypted value", encrypted_value);
    //
    // let decrypted_value = this.AESService.AESDecrypt(encrypted_value, "pt981105123");
    // console.log("Decrypted Value", decrypted_value);
  }

}
