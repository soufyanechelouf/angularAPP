import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
   
    
   
  };
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
 showSuperuserBoard = false;
  showModeratorBoard = false;
  username?: string;
  users: User[] = [];
  constructor(private authService:AuthService,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.listUsers();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN')||this.roles.includes('ROLE_SUPERUSER');
      this.showSuperuserBoard = this.roles.includes('ROLE_SUPERUSER');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }
  
  listUsers() {
  this.authService.users1().subscribe(
    data=>{
      this.users=data;
    }
  )
  }

  
  remove(user: User) {
   
    this.authService.remove(user);
    setTimeout(test, 1000);
   function  test(){
    document.location.reload();
    }
    
  }
  edit(user: User) {
   
    var x = document.getElementById(user.username);
var y=document.getElementsByClassName(user.username);
y.item(0)?.setAttribute("style","display:block");
y.item(1)?.setAttribute("style","display:block");
y.item(2)?.setAttribute("style","display:inline");
y.item(3)?.setAttribute("style","display:inline");

   /* if (x!.style.display === "none") {
      x!.style.display = "block";
    } else {
      x!.style.display = "none";
    }*/
    
  }

  update(user:User){
    var y=document.getElementsByClassName(user.username);
y.item(0)?.setAttribute("style","display:none");
y.item(1)?.setAttribute("style","display:none");
y.item(2)?.setAttribute("style","display:none");
y.item(3)?.setAttribute("style","display:none");

const { username, email,password } = this.form;

this.authService.update(user,username, email, password).subscribe(
  ( data: any) => {
    console.log(data);
   
  },
 
);
setTimeout(test, 1000);
   function  test(){
    document.location.reload();
    }
  }

}
