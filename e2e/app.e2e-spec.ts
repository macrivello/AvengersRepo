import { PolypathPage } from './app.po';

describe('polypath App', () => {
  let page: PolypathPage;

  beforeEach(() => {
    page = new PolypathPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
