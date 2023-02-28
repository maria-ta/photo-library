/* eslint-disable max-len */
import { fakeAsync, flush } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { IfLikedDirective } from './if-liked.directive';

const FAVORITES_MOCK = [
  'id-1',
  'id-2'
];

describe('IfLikedDirective', () => {
  let directive: IfLikedDirective;

  let templateRefMock: any;
  let viewContainerRefMock: any;
  let favoritesServiceMock: any;
  let favorites$: BehaviorSubject<string[]>;

  beforeEach(() => {
    templateRefMock = { key: 'templateRefMock' };
    viewContainerRefMock = {
      createEmbeddedView: jasmine.createSpy(),
      clear: jasmine.createSpy(),
    };
    favorites$ = new BehaviorSubject(FAVORITES_MOCK);
    favoritesServiceMock = {
      getFavorites$: jasmine.createSpy().and.returnValue(favorites$.asObservable()),
      isFavorite: jasmine.createSpy().and.callFake((id) => {
        return favorites$.value.includes(id);
      })
    };
    directive = new IfLikedDirective(
      templateRefMock,
      viewContainerRefMock,
      favoritesServiceMock
    );
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should create view when photo with specified id is in favorites', fakeAsync(() => {
      directive.appIfLiked = 'id-1';

      directive.ngOnInit();
      flush();

      expect(directive.hasView).toBeTrue();
      expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
    }));

    it('should not create view when photo with specified id is not in favorites', fakeAsync(() => {
      directive.appIfLiked = 'id-3';

      directive.ngOnInit();
      flush();

      expect(directive.hasView).toBeFalse();
      expect(viewContainerRefMock.createEmbeddedView).not.toHaveBeenCalled();
    }));

    describe('when photo id was changed', () => {
      it('should create view when photo id was changed from non-favorite to favorite', fakeAsync(() => {
        directive.appIfLiked = 'id-5';
        directive.hasView = false;

        directive.ngOnInit();
        flush();
        viewContainerRefMock.createEmbeddedView.calls.reset();
        directive.appIfLiked = 'id-1';

        expect(directive.hasView).toBeTrue();
        expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
      }));

      it('should not create view when photo id was changed from favorite to favorite', fakeAsync(() => {
        directive.appIfLiked = 'id-1';
        directive.hasView = true;

        directive.ngOnInit();
        flush();
        viewContainerRefMock.createEmbeddedView.calls.reset();
        directive.appIfLiked = 'id-2';

        expect(directive.hasView).toBeTrue();
        expect(viewContainerRefMock.createEmbeddedView).not.toHaveBeenCalledWith(templateRefMock);
      }));

      it('should clear view when photo id was changed from favorite to non-favorite', fakeAsync(() => {
        directive.appIfLiked = 'id-1';
        directive.hasView = true;

        directive.ngOnInit();
        flush();
        viewContainerRefMock.createEmbeddedView.calls.reset();
        directive.appIfLiked = 'id-5';

        expect(directive.hasView).toBeFalse();
        expect(viewContainerRefMock.createEmbeddedView).not.toHaveBeenCalled();
        expect(viewContainerRefMock.clear).toHaveBeenCalled();
      }));

      it('should not clear view when photo id was changed from non-favorite to non-favorite', fakeAsync(() => {
        directive.appIfLiked = 'id-6';
        directive.hasView = false;

        directive.ngOnInit();
        flush();
        viewContainerRefMock.createEmbeddedView.calls.reset();
        viewContainerRefMock.clear.calls.reset();
        directive.appIfLiked = 'id-5';

        expect(directive.hasView).toBeFalse();
        expect(viewContainerRefMock.createEmbeddedView).not.toHaveBeenCalled();
        expect(viewContainerRefMock.clear).not.toHaveBeenCalled();
      }));

      it('should not create view after directive destroy', fakeAsync(() => {
        directive.appIfLiked = 'id-5';
        directive.hasView = false;

        directive.ngOnInit();
        flush();
        directive.ngOnDestroy();
        viewContainerRefMock.createEmbeddedView.calls.reset();
        directive.appIfLiked = 'id-1';

        expect(directive.hasView).toBeFalse();
        expect(viewContainerRefMock.createEmbeddedView).not.toHaveBeenCalled();
      }));
    });

    describe('when favorites were changed', () => {
      it('should create view when photo id went from non-favorite to favorite', fakeAsync(() => {
        const id = 'id-3';
        directive.appIfLiked = id;
        directive.hasView = false;

        directive.ngOnInit();
        flush();
        viewContainerRefMock.createEmbeddedView.calls.reset();
        favorites$.next([...FAVORITES_MOCK, id]);
        flush();

        expect(directive.hasView).toBeTrue();
        expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
      }));

      it('should not create or clear view when photo id went from favorite to favorite', fakeAsync(() => {
        const id = FAVORITES_MOCK[0];
        directive.appIfLiked = id;
        directive.hasView = true;

        directive.ngOnInit();
        flush();
        viewContainerRefMock.createEmbeddedView.calls.reset();
        viewContainerRefMock.clear.calls.reset();
        favorites$.next([...FAVORITES_MOCK]);
        flush();

        expect(directive.hasView).toBeTrue();
        expect(viewContainerRefMock.createEmbeddedView).not.toHaveBeenCalled();
        expect(viewContainerRefMock.clear).not.toHaveBeenCalled();
      }));

      it('should clear view when photo id was went favorite to non-favorite', fakeAsync(() => {
        const id = FAVORITES_MOCK[0];
        directive.appIfLiked = id;
        directive.hasView = true;

        directive.ngOnInit();
        flush();
        viewContainerRefMock.createEmbeddedView.calls.reset();
        favorites$.next([...FAVORITES_MOCK.filter((favoriteId) => favoriteId !== id)]);
        flush();

        expect(directive.hasView).toBeFalse();
        expect(viewContainerRefMock.clear).toHaveBeenCalled();
      }));

      it('should not clear view when photo id went from non-favorite to non-favorite', fakeAsync(() => {
        const id = 'id-6';
        directive.appIfLiked = id;
        directive.hasView = false;

        directive.ngOnInit();
        flush();
        viewContainerRefMock.createEmbeddedView.calls.reset();
        favorites$.next([...FAVORITES_MOCK]);
        flush();

        expect(directive.hasView).toBeFalse();
        expect(viewContainerRefMock.clear).not.toHaveBeenCalled();
      }));

      it('should not create view after directive destroy', fakeAsync(() => {
        const id = 'id-3';
        directive.appIfLiked = id;
        directive.hasView = false;

        directive.ngOnInit();
        flush();
        directive.ngOnDestroy();
        viewContainerRefMock.createEmbeddedView.calls.reset();
        favorites$.next([...FAVORITES_MOCK, id]);
        flush();

        expect(directive.hasView).toBeFalse();
        expect(viewContainerRefMock.createEmbeddedView).not.toHaveBeenCalled();
      }));
    });
  });
});
