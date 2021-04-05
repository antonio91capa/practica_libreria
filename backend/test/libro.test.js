const request = require('supertest');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const Libro = require('../src/models/libro');
const Categoria = require('../src/models/categoria');
const app = require('../src/app');

describe('Testing API libro api/v1/libro', () => {
   it("debe retornar todos los libros", async () => {
      const categorias = await Categoria.find({});

      const libros = [
         {
            titulo: 'El guardian entre el centeno',
            descripcion: 'Es una historia en el que un niño sale de la escuela por mala educacion',
            categoria: mongoose.Types.ObjectId(categorias[0]._id),
            autor: 'J.D. Salingder',
            imagen: 'no-imagen.png',
            isbn: '9874790409939943',
            idioma: 'Español',
            editorial: 'Los Reyes',
            paginas: 120
         },
         {
            titulo: 'Rebelion en la granja',
            descripcion: 'Rebelion de animales en una granja',
            categoria: mongoose.Types.ObjectId(categorias[1]._id),
            autor: 'George Owerll',
            imagen: 'no-imagen.png',
            isbn: '98390288784003',
            idioma: 'Ingles',
            editorial: 'Alquimes S.C',
            paginas: 142
         }
      ];

      await Libro.insertMany(libros);

      const res = await request(app).get('/api/v1/libro/');

      expect(res.status).to.equal(200);
      expect(res.body.libros.length).to.equal(2);
   });

   it('debe retornar un libro si el id es valido', async () => {
      const libro = new Libro({
         titulo: 'Desde mi cielo',
         descripcion: 'Una nña cuenta el suceso en que una persona la asesino',
         categoria: mongoose.Types.ObjectId('605a8fd4f32ba802d0d21df0'),
         autor: 'Desconocido',
         imagen: 'no-imagen.png',
         isbn: '873900203083',
         idioma: 'Español',
         editorial: 'Fuentes Franco LLA',
         paginas: 168
      });

      await libro.save();
      const res = await request(app).get('/api/v1/libro/' + libro._id);

      expect(res.status).to.equal(200);
      expect(res.body.libro.length).to.equal(3);
      expect(res.body.libro.titulo).to.equal(libro.titulo);
      expect(res.body.libro.editorial).to.equal(libro.editorial);
   });


   it('Guardar un libro y retornar el libro guardado', async () => {
      const libro = new Libro({
         titulo: 'La cabaña',
         descripcion: 'Misterio de una niña asesinada en un bosque. Su padre va en busca de una respuesta',
         categoria: mongoose.Types.ObjectId('605a8fd4f32ba802d0d21df0'),
         autor: 'Young',
         imagen: 'no-imagen.png',
         isbn: '0098876367293662',
         idioma: 'Español',
         editorial: 'Mc Graw Hill',
         paginas: 140
      });

      const res = await request(app).post('/api/v1/libro/').send(libro);

      expect(res.status).to.equal(202);
      expect(res.body.libro.length).to.equal(1);
      expect(res.body.libro.titulo).to.equal(libro.titulo);
   });

   it('Actualizar un libro y retornar el libro actualizado', async () => {
      const libro = new Libro({
         titulo: 'Desde mi cielo',
         descripcion: 'Una nña cuenta el suceso en que una persona la asesino',
         categoria: mongoose.Types.ObjectId('605a8fd4f32ba802d0d21df0'),
         autor: 'Desconocido',
         imagen: 'no-imagen.png',
         isbn: '873900203083',
         idioma: 'Español',
         editorial: 'Fuentes Franco LLA',
         paginas: 168
      });

      await libro.save();

      const res = await request(app).put('/api/v1/libro/' + libro._id).send({ titulo: 'El Alquimista', autor: 'Paulo Coelho' });

      expect(res.status).to.equal(200);
      expext(res.body.libro.titulo).to.equal(libro.titulo);
   });

   it('Elimina un libro', async () => {

   });
});