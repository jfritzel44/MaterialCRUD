import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: any;
  user: any;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params.id;
    this.getUser(this.userId);
  }

  getUser(id) {
    this.userService.get(id).subscribe(user => {
      this.user = user.data;
    })
  }

  goToUsers() {
    this.router.navigate(['/users']);
  }

}
