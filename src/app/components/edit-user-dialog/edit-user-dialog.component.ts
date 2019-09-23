import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public userData: any, private userService: UserService,
  private dialogRef: MatDialogRef<EditUserDialogComponent>, private snackBar: MatSnackBar) {}
  
  error: boolean;
  success: boolean;
  loading: boolean;
  userWasEdited: boolean = false;

  ngOnInit() {
  }

  saveUser() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.userService.update(this.userData).subscribe(data => {
      this.success = true;
      this.snackBar.open('User was updated successfully', 'OK', {duration: 3000});
      setTimeout(() => this.dialogRef.close(data), 500);
      this.userWasEdited = true;
    }, error => {
      this.snackBar.open('Error updating user', 'OK', {duration: 3000});
      setTimeout(() => this.dialogRef.close(null), 500);
    }, () => {
      this.loading = false;
    })
  }

  cancel() {
    this.dialogRef.close(this.userWasEdited);
  }
}
