import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({
    description: 'Contact name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Contact email address',
    example: 'john@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+1234567890',
    required: false,
  })
  phone?: string;

  @ApiProperty({
    description: 'Contact address',
    example: '123 Main St',
    required: false,
  })
  address?: string;
}

