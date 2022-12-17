import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Nova solicitação de amizade.'),
      category: 'social',
      createdAt: new Date(),
      recipientId: 'test-recipientId',
      readAt: new Date(),
    });
    expect(notification).toBeTruthy();
  });
});
