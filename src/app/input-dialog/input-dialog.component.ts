// input-dialog.component.ts
import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
    
  ],
  templateUrl: './input-dialog.component.html',
  styleUrl: './input-dialog.component.css'
})
export class InputDialogComponent {

 
  inputData: string = '';
  title: string = '';
  label: string = '';
  type: string = '';
  

  constructor(
    private dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.title) {
      this.title = data.title;
      this.type = data.type;
    }
  }

  onSubmit(): void {
    if (this.inputData.trim() === '') {
     return;
    }else{
      this.dialogRef.close(this.inputData);
    
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
