import { ChangeDetectorRef } from '@angular/core';
import { PhotoCardComponent } from './photo-card.component';

describe('PhotoCardComponent', () => {
  let component: PhotoCardComponent;

  let cdMock: any;

  beforeEach(async () => {
    cdMock = {
      detectChanges: jasmine.createSpy(),
      markForCheck: jasmine.createSpy(),
      detach: jasmine.createSpy(),
      checkNoChanges: jasmine.createSpy(),
      reattach: jasmine.createSpy(),
    } as ChangeDetectorRef;
    component = new PhotoCardComponent(
      cdMock
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngAfterViewInit', () => {
    it('should update image size', () => {
      const expectedImageSize = 123;
      component.imageElementRef = {
        nativeElement: {
          width: expectedImageSize
        }
      };

      component.ngAfterViewInit();

      expect(component.imageSize).toEqual(expectedImageSize);
    });
  });

  describe('#clickImage', () => {
    it('should emit imageClick', () => {
      spyOn(component.imageClick, 'emit');

      component.clickImage();

      expect(component.imageClick.emit).toHaveBeenCalled();
    });
  });
});
