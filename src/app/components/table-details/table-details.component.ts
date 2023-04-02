import { Component, Input } from '@angular/core';
import { SubmitService } from 'src/shared/services/submit.service';

@Component({
  selector: 'app-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.scss'],
})
export class TableDetailsComponent {
  @Input() personDetails: any = [];

  displayedColumns: string[] = [
    'fullName',
    'mobile',
    'address',
    'skills',
    'hobbies',
    'imageUrl',
  ];

  constructor(private submit: SubmitService) {}

  ngOnInit(): void {
    console.log(this.personDetails);
  }
}
