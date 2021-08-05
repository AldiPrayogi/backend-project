const HeroService = require('../../server/services/heroService');
const HeroRepository = require('../../server/repositories/heroRepository');
const { v4 } = require('uuid');
const TypeService = require('../../server/services/typeService');

const {
  findOneByID,
  findAll,
  destroyHero,
  create,
  update
} = HeroRepository;

const {
  fetchOneType, fetchOneTypeByName,
} = TypeService

const {
  fetchOneHero,
  fetchAllHeroes,
  deleteHero,
  makeHero,
  updateHero,
} = HeroService;

jest.mock(
  '../../server/repositories/heroRepository', () => ({
    create: jest.fn(),
    findOneByID: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    destroyHero: jest.fn(),
  }));

jest.mock('../../server/services/typeService', () => ({
  fetchOneTypeByName: jest.fn(),
  fetchOneType: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
})

describe('heroServices', () => {
  describe('fetchOneHero', () => {
    it('should return the correct hero from the correct id', async() => {
      const mockReturnedValue = {
        dataValues: {
          id: '123',
          name: 'MockHero',
          description: 'Mock Hero Jest',
          level: 123,
          createdAt: '2021-08-02T08:50:57.550Z',
          updatedAt: '2021-08-05T07:52:12.852Z',
          Type: {
            dataValues: {
              id: '1234',
              name: 'Thief',
            },
          },
        },
      };
      const mockID = '123';

      const expectedValue = {
        id: '123',
        name: 'MockHero',
        description: 'Mock Hero Jest',
        level: 123,
        createdAt: '2021-08-02T08:50:57.550Z',
        updatedAt: '2021-08-05T07:52:12.852Z',
        type: {
          id: '1234',
          name: 'Thief',
        },
      };

      findOneByID.mockResolvedValue(mockReturnedValue);

      const returnedHero = await fetchOneHero(mockID);

      expect(returnedHero).toEqual(expectedValue);
    });

    it('should return error if hero is not found', async() => {
      const mockID = '123';
      const returnedValue = undefined;
      const mockError = new Error(`No Heroes With ID: ${mockID} is Found!`);

      findOneByID.mockResolvedValue(returnedValue);

      await expect(fetchOneHero(mockID)).rejects.toThrowError(mockError);
    });
  });

  describe('fetchAllHeroes', () => {
    it('should return a list of heroes when called', async() => {
      const mockReturnedValues = {
        heroes: [
          {
            dataValues: {
              id: '123',
              name: 'MockHero',
              description: 'Mock Hero Jest',
              level: 123,
              createdAt: '2021-08-02T08:50:57.550Z',
              updatedAt: '2021-08-05T07:52:12.852Z',
              Type: {
                dataValues: {
                  id: '1234',
                  name: 'Thief',
                },
              },
            },
          },
          {
            dataValues: {
              id: '1234',
              name: 'MockHero',
              description: 'Mock Hero Jest',
              level: 123,
              createdAt: '2021-08-02T08:50:57.550Z',
              updatedAt: '2021-08-05T07:52:12.852Z',
              Type: {
                dataValues: {
                  id: '1234',
                  name: 'Thief',
                },
              },
            },
          },
        ],
        count: 2,
      };
      const expectedCount = 2;
      const expectedValues = {
        returnedHeroes: [
          {
            id: '123',
            name: 'MockHero',
            description: 'Mock Hero Jest',
            level: 123,
            createdAt: '2021-08-02T08:50:57.550Z',
            updatedAt: '2021-08-05T07:52:12.852Z',
            type: {
              id: '1234',
              name: 'Thief',
            },
          },
          {
            id: '1234',
            name: 'MockHero',
            description: 'Mock Hero Jest',
            level: 123,
            createdAt: '2021-08-02T08:50:57.550Z',
            updatedAt: '2021-08-05T07:52:12.852Z',
            type: {
              id: '1234',
              name: 'Thief',
            },
          },
        ],
        count: expectedCount,
      };
      const offset = 0;

      findAll.mockResolvedValue(mockReturnedValues);

      const returnedHeroes = await fetchAllHeroes(offset);

      expect(returnedHeroes).toEqual(expectedValues);
    });

    it('should throw error if returned heroes is 0', async() => {
      const mockReturnedValues = {
        heroes: [],
        count: 0,
      };

      findAll.mockResolvedValue(mockReturnedValues);

      const mockError = new Error(`No Heroes Found!`);

      await expect(fetchAllHeroes(0)).rejects.toThrowError(mockError);
    });
  });

  describe('deleteHero', () => {
    it('should return success if hero is successfully deleted', async() => {
      const mockReturnedHero = {
        id: '123',
        name: 'MockHero',
        description: 'Mock Hero Jest',
        level: 123,
        createdAt: '2021-08-02T08:50:57.550Z',
        updatedAt: '2021-08-05T07:52:12.852Z',
        type: {
          id: '1234',
          name: 'Thief',
        },
      };
      const mockID = '123';
      const expectedReturnedMessage = 'Success';

      findOneByID.mockResolvedValue(mockReturnedHero);
      destroyHero.mockResolvedValue(1);

      const actualResult = await deleteHero(mockID);

      expect(actualResult).toEqual(expectedReturnedMessage);
    });

    it('should throw error if hero is not found', async() => {
      const mockID = '123';
      const returnedValue = undefined;
      const mockError = new Error('Cannot Find The Hero!');

      findOneByID.mockResolvedValue(returnedValue);

      await expect(deleteHero(mockID)).rejects.toThrowError(mockError);
    });

    it('should throw error if hero deletion failed', async() => {
      const mockID = '123';
      const mockReturnedHero = {
        id: '123',
        name: 'MockHero',
        description: 'Mock Hero Jest',
        level: 123,
        createdAt: '2021-08-02T08:50:57.550Z',
        updatedAt: '2021-08-05T07:52:12.852Z',
        type: {
          id: '1234',
          name: 'Thief',
        },
      };
      const mockError = new Error('Failed to Delete Hero!');


      findOneByID.mockResolvedValue(mockReturnedHero);
      destroyHero.mockResolvedValue(0);

      await expect(deleteHero(mockID)).rejects.toThrowError(mockError);
    });
  });

  describe('makeHero', () => {
    const mockV4 = '11223344-55667788';
    let mockReturnedValue = {
      dataValues: {
        id: '11223344',
        name: 'MockHero',
        description: 'Mock Hero Jest',
        level: 123,
        createdAt: '2021-08-02T08:50:57.550Z',
        updatedAt: '2021-08-05T07:52:12.852Z',
        Type: {
          dataValues: {
            id: '1234',
            name: 'Thief',
          },
        },
      },
    };
    const mockEmptyHero = undefined;
    const mockPayload = {
      name: 'test',
      description: 'testing',
      level: 123,
      type: 'Archer',
      typeID: '1234',
    }
    const mockPayloadEmptyTypeID = {
      name: 'test',
      description: 'testing',
      level: 123,
      type: 'Archer',
    }
    const mockReturnedType = {
      id: '1234',
      name: 'Archer',
    }

    it('should return createdHero if makeHero is successful', async () => {
        v4.mockReturnValue(mockV4);
        findOneByID.mockResolvedValue(mockEmptyHero);
        fetchOneType.mockResolvedValue(mockReturnedType);
        create.mockReturnValue(mockReturnedValue);

        const actualResult = await makeHero(mockPayload);

        expect(actualResult).toEqual(mockReturnedValue);
    });

    it('should fetch typebyname if typeID does not exist', async () => {
      const mockEmptyHero = undefined;

      v4.mockReturnValue(mockV4);
      findOneByID.mockResolvedValue(mockEmptyHero);
      fetchOneTypeByName.mockResolvedValue(mockReturnedType);
      create.mockReturnValue(mockReturnedValue);

      const actualResult = await makeHero(mockPayloadEmptyTypeID);

      expect(actualResult).toEqual(mockReturnedValue);
    });

    it('should throw error if name is not provided', async () => {
      const mockPayload = {
        description: 'testing',
        level: 123,
        type: 'Archer',
        typeID: '1234',
      }
      const expectedError = new Error('Hero\'s Name is Not Provided!');

      await expect(makeHero(mockPayload)).rejects.toThrowError(expectedError);
    });

    it('should throw error if hero failed to be created', async() => {
      const mockV4 = '11223344-55667788';
      mockReturnedValue = {
        dataValues: undefined,
      };

      const mockThrownError = new Error('Failed to Create Hero!');

      v4.mockReturnValue(mockV4);
      findOneByID.mockResolvedValue(mockEmptyHero);
      fetchOneType.mockResolvedValue(mockReturnedType);
      create.mockReturnValue(mockReturnedValue);

      await expect(makeHero(mockPayload)).rejects.toThrowError(mockThrownError);
    });
  });

  describe('updateHero', () => {

    const mockReturnedHero = {
      dataValues: {
        id: '123',
        name: 'MockHero',
        description: 'Mock Hero Jest',
        level: 123,
        createdAt: '2021-08-02T08:50:57.550Z',
        updatedAt: '2021-08-05T07:52:12.852Z',
        typeID: '123',
      },
    };
    const mockReturnedType = {
      dataValues: {
        id: '1234',
        name: 'Thief',
      },
    };
    const mockPayload = {
      id: '123',
      name: 'Mocked Edit',
      description: 'mock description',
      level: 4,
      type: {
        id: '1234',
        name: 'mockType',
      }
    }
    const mockID = '123';

    it('should return success if hero is updated successfully', async () => {
      findOneByID.mockResolvedValue(mockReturnedHero);
      update.mockResolvedValue(1);

      const actualResult = await updateHero(mockID, mockPayload);

      expect(actualResult).toEqual('Success');
    });

    it('should call fetchOneTypeByName if type id is not provided', async () => {
      const mockPayloadEmptyTypeId = {
        id: '123',
        name: 'Mocked Edit',
        description: 'mock description',
        level: 4,
        type: {
          name: 'mockType',
        }
      }

      const mockID = '123';

      findOneByID.mockResolvedValue(mockReturnedHero);
      update.mockResolvedValue(1);
      fetchOneTypeByName.mockResolvedValue(mockReturnedType);

      const actualResult = await updateHero(mockID, mockPayloadEmptyTypeId);

      expect(actualResult).toEqual('Success');
    });

    it('should throw error if hero is not found', async () => {
      const mockHeroEmpty = undefined;
      const expectedError = new Error('Cannot Find The Hero!');

      findOneByID.mockResolvedValue(mockHeroEmpty);

      await expect(updateHero(mockID, mockPayload)).rejects.toThrowError(expectedError);
    });

    it('should thrown error if hero is failed to update', async () => {

      const mockPayloads = {
        id: '123',
        name: 'Mocked Edit',
        description: 'mock description',
        level: 4,
        type: {
          id: '1234',
          name: 'mockType',
        }
      }

      findOneByID.mockResolvedValue(mockReturnedHero);
      fetchOneTypeByName.mockResolvedValue(mockReturnedType);
      update.mockResolvedValue([0]);

      const expectedError = new Error('Failed To Update Tweet!');

      await expect(updateHero(mockID, mockPayloads)).rejects.toThrowError(expectedError);
    });
  });
});
