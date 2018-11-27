import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  title = "Angular 4 Project!";
  todaydate;
  componentproperty;
  emailid;
  formdata;
  ngOnInit() {
    this.formdata = new FormGroup({
      emailid: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[^ @]*@[^ @]*")
        ])
      ),
      passwd: new FormControl("")
    });
  }
  onClickSubmit(data) {
    this.emailid = data.emailid;
  }
}
