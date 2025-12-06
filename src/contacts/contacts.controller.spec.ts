import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';

describe('ContactsController', () => {
  let controller: ContactsController;
  let service: ContactsService;

  const mockContactsService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [
        {
          provide: ContactsService,
          useValue: mockContactsService,
        },
      ],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
    service = module.get<ContactsService>(ContactsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a contact successfully', async () => {
      const createContactDto: CreateContactDto = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        address: '123 Main St',
      };

      const expectedContact: Contact = {
        id: 1,
        name: createContactDto.name,
        email: createContactDto.email,
        phone: createContactDto.phone || null,
        address: createContactDto.address || null,
      };

      mockContactsService.create.mockResolvedValue(expectedContact);

      const result = await controller.create(createContactDto);

      expect(result).toEqual(expectedContact);
      expect(mockContactsService.create).toHaveBeenCalledWith(createContactDto);
      expect(mockContactsService.create).toHaveBeenCalledTimes(1);
    });

    it('should create a contact with only required fields', async () => {
      const createContactDto: CreateContactDto = {
        name: 'Jane Doe',
        email: 'jane@example.com',
      };

      const expectedContact: Contact = {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: null,
        address: null,
      };

      mockContactsService.create.mockResolvedValue(expectedContact);

      const result = await controller.create(createContactDto);

      expect(result).toEqual(expectedContact);
      expect(mockContactsService.create).toHaveBeenCalledWith(createContactDto);
    });

    it('should handle service errors', async () => {
      const createContactDto: CreateContactDto = {
        name: 'Error Test',
        email: 'error@example.com',
      };

      const error = new Error('Service error');
      mockContactsService.create.mockRejectedValue(error);

      await expect(controller.create(createContactDto)).rejects.toThrow(error);
      expect(mockContactsService.create).toHaveBeenCalledWith(createContactDto);
    });
  });
});

