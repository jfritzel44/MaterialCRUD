import { Component, OnInit, ViewChild,  } from '@angular/core';
import { AddUserDialogComponent } from '../../components/add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from '../../components/edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material';
import { MatTable } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  users: any;
  loading: boolean;  
  displayedColumns: string[] = ['id', 'email', 'name', 'avatar'];

  @ViewChild(MatTable, null) table: MatTable<any>;

  constructor(private userService: UserService, private matDialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  addUser() {
    this.matDialog.open(AddUserDialogComponent, {
      width: '600px',
    }).afterClosed().subscribe(user => {
      if (user) {
        this.addUserToList(user);
      }
    });;
  }

  getUsers() {
    this.loading = true;
    this.users = [];
    this.userService.getAll().subscribe(users => {
      this.users = users.data;
      this.setUsersUnchecked();
    }, error => {

    }, () => {
      this.loading = false;
    })    
  }

  addUserToList(user) {
    this.users.push(user);
    this.table.renderRows();
  }

  modifyUserInList(user) {
    const index = this.users.findIndex(x => x.id === user.id);

    if (index) {
      this.users[index] = user;
      this.table.renderRows();
    }
  }

  getCheckedUser() {
    if (!this.users) {
      return;
    }

    const checkedUser = this.users.filter(user => user.isChecked === true);

    if (!checkedUser || !checkedUser.length) {
      return null;
    }

    return checkedUser[0];
  }

  editUser() {
    const checkedUser = this.getCheckedUser();
    
    if (!checkedUser) {
      return;
    }

    this.matDialog.open(EditUserDialogComponent, {
      width: '600px',
      data: checkedUser
    }).afterClosed().subscribe(user => {
      if (user) {
        this.modifyUserInList(user);
      }
    });
  }

  setUsersUnchecked() {
    this.users.forEach(user => {
      user.checked = false;
    });
  }

  userIsChecked() {
    return this.users.filter(user => user.isChecked === true);
  }

  checkUser(userToCheck, $event) {
    if (userToCheck.isChecked === true) {
      userToCheck.isChecked = false; 
    } else {
      userToCheck.isChecked = true;
    }

    /* Uncheck all other users */
    this.users.forEach(user => {
      if (user.id != userToCheck.id) {
        user.isChecked = false;
      }
    });
  }

  goToDetails(row) {
    this.router.navigate(['/details/' + row.id]);
  }

}
