const { MongoClient, ObjectId } = require('mongodb');
const { UserService, createClient, createUserIndexes } = require('../user-service');
const { MongoMemoryServer } = require('mongodb-memory-server');

// NOTE: this for removing the global mocks
jest.deepUnmock('mongodb');

function seedData(
  client,
  data,
  database,
  collection
) {
  return client.db(database).collection(collection).insertMany(data);
}

describe('UserService', () => {
  const database = 'mongodb-testing';
  const seed = require('./seed.js');

  let mongod;
  let client;
  let userService;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    client = await createClient(mongod.getUri());
    await seedData(client, seed, database, 'users');
    userService = new UserService(client, database);
  });

  afterAll(async () => {
    await client.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    await client.db(database).collection('users').deleteMany({
      name: 'test-user'
    });
  });


  describe('createUser', () => {
    it('should create a new user', async () => {
      const result = await userService.createUser({
        userName: "testUser",
        password: 'fasdfasdf',
        salt: 'tesut-user',
        userType: 'admin'
      });

      expect(result.acknowledged).toBe(true);
    });
  });
});

//   describe('getUser', () => {
//     it('should return the correct user', async () => {
//       const user = await userService.getUser('chef@email.com');

//       expect(user).toEqual({
//         _id: expect.any(ObjectId),
//         name: 'mock-chef',
//         email: 'chef@email.com',
//         age: 27,
//         occupation: 'chef',
//         timestamp: '2021-09-29T15:48:13.209Z'
//       });
//     });
//   });

//   describe('getUsersByOccupation', () => {
//     it('should return all matching users', async () => {
//       const users = await userService.getUsersByOccupation('engineer');

//       expect(users).toEqual([
//         {
//           _id: expect.any(ObjectId),
//           name: 'mock-engineer',
//           email: 'engineer@email.com',
//           age: 17,
//           occupation: 'engineer',
//           timestamp: '2021-09-26T15:48:13.209Z'
//         },
//         {
//           _id: expect.any(ObjectId),
//           name: 'mock-engineer-2',
//           email: 'engineer-2@email.com',
//           age: 36,
//           occupation: 'engineer',
//           timestamp: '2021-09-26T15:48:13.209Z'
//         }
//       ]);
//     });
//   });

//   describe('updateUser', () => {
//     it('should update the matched user', async () => {
//       await userService.createUser({
//         age: 17,
//         email: 'mock@email.com',
//         name: 'test-user',
//         occupation: 'engineer'
//       });

//       const { acknowledged, modifiedCount } = await userService.updateUser(
//         'mock@email.com',
//         {
//           age: 19
//         }
//       );

//       expect(acknowledged).toBe(true);
//       expect(modifiedCount).toBe(1);
//     });
//   });

//   describe('deleteUser', () => {
//     it('should delete the matched user', async () => {
//       await userService.createUser({
//         age: 17,
//         email: 'mock@email.com',
//         name: 'test-user',
//         occupation: 'engineer'
//       });

//       const { acknowledged, deletedCount } = await userService.deleteUser(
//         'mock@email.com'
//       );

//       expect(acknowledged).toBe(true);
//       expect(deletedCount).toBe(1);
//     });
//   });
// });