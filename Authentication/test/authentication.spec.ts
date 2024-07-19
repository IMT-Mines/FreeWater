import { beforeAll, describe, expect, it, vi } from 'vitest';
import { AuthenticationService } from '../src/service/authentication.service';
import pool from '../src/database/db';
import bcrypt from 'bcrypt';

describe('AuthenticationService', () => {
  let sut: AuthenticationService;

  beforeAll(() => {
    sut = new AuthenticationService();
  });

  describe('findUserByUsername', () => {
    it('should return user with success', async () => {
      // Arrange
      const mockUsername = 'testuser';
      const mockUser = { id: 1, username: mockUsername, password: 'hashedpassword' };
      const mockQuery = vi.spyOn(pool, 'query').mockResolvedValue([[mockUser as any], []]);

      // Act
      const response = await sut.findUserByUsername(mockUsername);

      // Assert
      expect(response).toEqual(mockUser);
      expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM users WHERE username = ?', [mockUsername]);
      mockQuery.mockRestore();
    });
  });

  describe('insertUser', () => {
    it('should insert a user with hashed password', async () => {
      // Arrange
      const mockUsername = 'newuser';
      const mockPassword = 'plainpassword';
      const mockHashedPassword = 'hashedpassword';

      const bcryptSpy = vi.spyOn(bcrypt, 'hash').mockResolvedValue(mockHashedPassword as any);
      const mockQuery = vi.spyOn(pool, 'query').mockResolvedValue([{ insertId: 1 } as any, undefined!]);

      // Act
      await sut.insertUser(mockUsername, mockPassword);

      // Assert
      expect(bcryptSpy).toHaveBeenCalledWith(mockPassword, 10);
      expect(mockQuery).toHaveBeenCalledWith(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [mockUsername, mockHashedPassword]
      );
      bcryptSpy.mockRestore();
      mockQuery.mockRestore();
    });
  });
});
