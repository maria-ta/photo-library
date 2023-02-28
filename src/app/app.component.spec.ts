import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    component = new AppComponent();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'PhotoLibrary App'`, () => {
    expect(component.title).toEqual('PhotoLibrary App');
  });
});
