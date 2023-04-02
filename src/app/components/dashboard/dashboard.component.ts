import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SubmitService } from 'src/shared/services/submit.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  detailsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private submit: SubmitService,
    private sanitizer: DomSanitizer
  ) {
    this.createForm();
  }
  ngOnInit(): void {}

  createForm() {
    this.detailsForm = this.fb.group({
      fullName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      skills: [''],
      hobbies: [''],
      fileId: [''],
      imageUrl: [''],
    });
  }
  imagePath: any;
  localUrl: any;
  selectedFile: any = null;
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.localUrl = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  // showPreviewImage(event: any) {
  //     if (event.target.files && event.target.files[0]) {
  //         var reader = new FileReader();
  //         reader.onload = (event: any) => {
  //             this.localUrl = event.target.result;
  //         }
  //         reader.readAsDataURL(event.target.files[0]);
  //     }
  // }

  employee: any = [];
  postResponse: any;
  successResponse!: string;

  onSubmit() {
    this.submit.uploadFile(this.selectedFile).subscribe({
      next: (res: any) => {
        console.log(`Response`, res);
        this.detailsForm.value.fileId = res;
        this.detailsForm.value.imageUrl = this.localUrl;
        console.log(`FileId`, this.detailsForm.value);
        this.employee.push(this.detailsForm.value);
      },
      err: (err: any) => console.log(`Error`, err),
      complete: () => {
        this.submit.submitDetails(this.detailsForm.value).subscribe({
          next: (res: any) => {
            console.log(`res`, res);
          },
          error: (err: any) => console.log(`err`, err),
          complete: () => {
            console.log(`in complete`);
          },
        });
        this.detailsForm.reset();
      },
    });
  }
}
