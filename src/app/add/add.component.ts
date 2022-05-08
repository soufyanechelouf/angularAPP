import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
  form: any = {
    username: null,
    email: null,
    password: null,
    
   
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  roles=[
  {id:1,select:false,name:'new'},
  {id:2,select:false,name:'user'},
  {id:3,select:false,name:'sup'},
  {id:4,select:false,name:'admin'},];

  
   roleArray : string[] = [];

  onChangeRoles($event:any){
    const id=$event.target.id;
    const isChecked=$event.target.checked;
    
this.roles=this.roles.map((d)=>{
  if(d.id==id){
    d.select=isChecked;
    this.roleArray.push(d.name);
    return d;
  }
  return d;
});

console.log(this.roles);
console.log(this.roleArray);
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
  
    const { username, email, password } = this.form;

    this.authService.register(username, email, password,this.roleArray).subscribe(
      (      data: any) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err:any) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
   // location.replace("/user")
  }
}
