const request = require('supertest');
const expect = require('chai').expect;

const Usuario = require('../src/models/usuario');
const app = require('../src/app');

describe('api/v1/usuario', () => {
   beforeEach(async () => {
      await Usuario.deleteMany({});
   });

   after(async () => {
      console.log('Testing Usuarios terminado');
   });

   describe("GET /", () => {
      it("debe retornar todos los usuarios", async () => {
         const usuarios = [
            { nombre: 'Test 1', apellidos: 'Test 1', email: 'test1@mail.com', password: '123', estado: 1 },
            { nombre: 'Test 2', apellidos: 'Test 2', email: 'test2@mail.com', password: '1234', estado: 1 },
            { nombre: 'Test 3', apellidos: 'Test 3', email: 'test3@mail.com', password: '12345', estado: 1 }
         ];

         await Usuario.insertMany(usuarios);

         const res = await request(app).get('/api/v1/usuario/');

         expect(res.status).to.equal(200);
         expect(res.body.usuarios.length).to.equal(3);
      });
   });

   describe("GET /:id", () => {
      it('debe retornar un usuario si el id es valido', async () => {
         const usuario = new Usuario({
            nombre: 'Alejandro',
            apellidos: 'Lopez',
            email: 'alex@mail.com',
            password: '12300',
            estado: 1
         });

         await usuario.save();
         const res = await request(app).get('/api/v1/usuario/' + usuario._id);

         expect(res.status).to.equal(200);
         expect(res.body.usuario.nombre).to.equal(usuario.nombre);
      });

      it('debe retornar error 400 cuando el object id es invalido', async () => {
         const res = await request(app).get('/api/v1/usuario/1');

         expect(res.status).to.equal(400);
      });

      it('debe retorna error 404 cuando el object id es valido pero no existe', async () => {
         const res = await request(app).get('/api/v1/usuario/111111111111');

         expect(res.status).to.equal(404);
      })
   });

});