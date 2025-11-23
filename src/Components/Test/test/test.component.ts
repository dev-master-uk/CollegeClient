import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BranchImgService } from '../../../Services/BranchImg/branch-img.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  id: string = 'e4ac2b3c-8402-4417-d0cf-08dd2835ce47';
    model: any;
  constructor(private route: Router, private imgbrS: BranchImgService) { }
  ngOnInit(): void {
    this.imgbrS.getByIdandTypeGrid(this.id)
      .subscribe({
        next: (response) => {
          this.model = response;
          console.log('kkkkkkkkk',response)
        }
      })

    }
  onClick(): void {
   // this.id = '10187e17-2406-4876-b852-fe07183804e2';
    this.route.navigateByUrl(`/comst/bc86b506-8b74-4c2d-8a8a-d1839e12ab8e`);
  //  this.route.navigateByUrl(`/addbr`);
  }
}
