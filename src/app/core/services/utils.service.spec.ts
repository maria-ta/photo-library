import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    service = new UtilsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getRandomElementFromArray', () => {
    it('should get a random element from an array', () => {
      const arr = [2, 4, 6];
      const element = service.getRandomElementFromArray(arr);
      expect(arr.includes(element)).toBeTrue();
    });
  });

  describe('#getRandomNumber', () => {
    it('should get a random number in range', () => {
      const from = -3;
      const to = 9;
      const result = service.getRandomNumber(from, to);
      expect(result >= from).toBeTrue();
      expect(result <= to).toBeTrue();
    });
  });
});
