import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

describe('ContactsService', () => {
  let service: ContactsService;
  let repository: Repository<Contact>;

  const mockRepository = {
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        {
          provide: getRepositoryToken(Contact),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
    repository = module.get<Repository<Contact>>(getRepositoryToken(Contact));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      mockRepository.save.mockResolvedValue(expectedContact);

      const result = await service.create(createContactDto);

      expect(result).toEqual(expectedContact);
      expect(mockRepository.save).toHaveBeenCalledWith(createContactDto);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
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

      mockRepository.save.mockResolvedValue(expectedContact);

      const result = await service.create(createContactDto);

      expect(result).toEqual(expectedContact);
      expect(mockRepository.save).toHaveBeenCalledWith(createContactDto);
    });

    it('should handle repository errors', async () => {
      const createContactDto: CreateContactDto = {
        name: 'Error Test',
        email: 'error@example.com',
      };

      const error = new Error('Database error');
      mockRepository.save.mockRejectedValue(error);

      await expect(service.create(createContactDto)).rejects.toThrow(error);
      expect(mockRepository.save).toHaveBeenCalledWith(createContactDto);
    });
  });

  describe('findAll', () => {
    it('should return all contacts', async () => {
      const contacts = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', address: '123 Main St' },
      ];
      mockRepository.find.mockResolvedValue(contacts);
    });

    it('should handle repository errors', async () => {
      const error = new Error('Database error');
      mockRepository.find.mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrow(error);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if no contacts are found', async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return a 500 error if the repository throws an error', async () => {
      const error = new Error('Database error');
      mockRepository.find.mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrow(error);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});

