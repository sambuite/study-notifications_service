import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: 'exemple-recipient-id-1',
      }),
    );

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: 'exemple-recipient-id-1',
      }),
    );

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: 'exemple-recipient-id-2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'exemple-recipient-id-1',
    });

    expect(count).toEqual(2);
  });
});
