
describe('Example', () => {
    beforeAll(async () => {
        await device.launchApp();
    });
  
    beforeEach(async () => {
        await device.launchApp({ newInstance: true });
    });
  
    it('after loading, should have an item, press it and show CoinDetail view with LineChart', async () => {
        await expect(element(by.id('CoinRow.1'))).toBeVisible();
        await element(by.id('CoinRow.1')).tap();
        await expect(element(by.id('CoinDetail'))).toBeVisible();
        await expect(element(by.id('LineChart'))).toBeVisible();
    });
    
  });