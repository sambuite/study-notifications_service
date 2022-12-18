import { Notification } from '@application/entities/notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'test-recipient-id-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'test-recipient-id-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'test-recipient-id-2' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'test-recipient-id-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'test-recipient-id-1' }),
        expect.objectContaining({ recipientId: 'test-recipient-id-1' }),
      ]),
    );
  });
});
