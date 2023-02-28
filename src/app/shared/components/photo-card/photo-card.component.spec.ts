import { ChangeDetectorRef } from '@angular/core';
import { PhotoCardComponent } from './photo-card.component';

describe('PhotoCardComponent', () => {
  let component: PhotoCardComponent;

  let cdMock: any;
  let favoritesServiceMock: any;

  beforeEach(async () => {
    cdMock = {
      detectChanges: jasmine.createSpy(),
      markForCheck: jasmine.createSpy(),
      detach: jasmine.createSpy(),
      checkNoChanges: jasmine.createSpy(),
      reattach: jasmine.createSpy(),
    } as ChangeDetectorRef;
    favoritesServiceMock = {
      toggleFavourites: jasmine.createSpy()
    };
    component = new PhotoCardComponent(
      favoritesServiceMock,
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

  describe('#toggleFavorite', () => {
    it('should toggle favorite for photo', () => {
      component.photo = { id: 'photoId' } as any;

      component.toggleFavorite();

      expect(favoritesServiceMock.toggleFavourites).toHaveBeenCalledWith(component.photo);
    });

    it('should not toggle favorite for photo when there are no photo', () => {
      component.photo = undefined;

      component.toggleFavorite();

      expect(favoritesServiceMock.toggleFavourites).not.toHaveBeenCalled();
    });
  });
});
