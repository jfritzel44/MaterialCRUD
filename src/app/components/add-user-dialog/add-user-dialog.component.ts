import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public userData: any, private userService: UserService,
  private snackBar: MatSnackBar, private dialogRef: MatDialogRef<AddUserDialogComponent>) {}
  
  user: any = {};
  error: boolean;
  success: boolean = false;
  userWasAdded: boolean = false;
  loading: boolean;

  ngOnInit() {

  }

  addUser() {
    this.loading = true;
    this.userService.add(this.user).subscribe(data => {
      this.success = true;
      this.snackBar.open('User was added successfully', 'OK', {duration: 3000});
      setTimeout(() => this.dialogRef.close(data), 500);
    }, error => {
      this.snackBar.open('Error adding user', 'OK', {duration: 3000});
      setTimeout(() => this.dialogRef.close(null), 500);
    }, () => {
      this.loading = false;
    })
  }

  close() {
    this.dialogRef.close(this.userWasAdded);
  }
}