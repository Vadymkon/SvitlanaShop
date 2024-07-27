import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DataStorageService} from "../../services/data.storage.service";
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit, OnChanges {
  @Input() title: string = "";
  @Input() hint: string = "";
  @Input() id: string = "";
  @Input() value: string = "";
  @Input() validators: ValidatorFn[] = [
  ];
  @Input() langCode: string = ""; //for messageboxes

  form: FormGroup;

  constructor(private dataService: DataStorageService,
              private fb: FormBuilder)
  {
    this.form = new FormGroup({
      title_control: new FormControl('', [])
    });
  }

  get title_control() {
    return this.form.controls['title_control'] as FormControl;
  }

  onValueChange(event: any) {   //change it inside data-storage
    this.dataService.set(this.id, this.title_control.value);
  }

  ngOnInit() {
    this.form = this.fb.group({
      title_control: ['', this.validators]
    });
    this.title_control.setValue(this.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && !changes['value'].isFirstChange()) {
      this.title_control.setValue(this.value);
    }
  }
}
