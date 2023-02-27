import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { Photo } from '@core/models';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent implements AfterViewInit {
  @Input() photo?: Photo;

  @ViewChild('image') imageElementRef?: ElementRef;

  imageSize = 0;

  constructor(
    private readonly cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.imageSize = this.imageElementRef?.nativeElement.width;
    this.cd.detectChanges();
  }
}
