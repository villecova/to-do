import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { Route, Router } from '@angular/router'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class WelcomePage implements OnInit {
  constructor(private route: Router) {}

  ngOnInit() {}

  start() {
    this.route.navigate(['/home'])
  }
}
