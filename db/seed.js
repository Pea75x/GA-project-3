import { connectToDb, disconnetDb } from './helper.js';

import data from './data.js';
import Places from '../models/places.js';
import User from '../models/user.js';
import Station from '../models/station.js';

async function seed() {
  await connectToDb();
  console.log('Successfully connected to Mongo DB via Mongoose!');

  console.log('Clearing out the DB..');
  await Places.deleteMany({});
  await User.deleteMany({});
  await Station.deleteMany({});

  console.log('Creating users..');

  const adminUser = await User.create({
    name: 'admin',
    username: 'admin',
    image: 'https://cdn-icons-png.flaticon.com/512/2206/2206368.png',
    email: 'admin@admin.com',
    password: 'password!1',
    isAdmin: true
  });

  const normalUser = await User.create({
    name: 'user',
    username: 'user',
    image:
      'https://media.istockphoto.com/vectors/male-user-icon-vector-id517998264?k=20&m=517998264&s=612x612&w=0&h=pdEwtkJlZsIoYBVeO2Bo4jJN6lxOuifgjaH8uMIaHTU=',
    email: 'user@user.com',
    password: 'password!1'
  });

  const eve = await User.create({
    name: 'eve',
    username: 'eve',
    image: 'https://i.ibb.co/LdFXjK6/girl-1.jpg',
    email: 'eve@eve.com',
    password: 'password!1'
  });

  const edwardFoulds = await User.create({
    name: 'Edward Foulds',
    username: 'efoulds1',
    image: 'https://i.ibb.co/dJP71gC/Untitled.png',
    email: 'efoulds@efoulds.com',
    password: 'password!1'
  });

  const jimBrown = await User.create({
    name: 'Jim Brown',
    username: 'jbrown',
    image:
      'https://res.cloudinary.com/pea75x/image/upload/v1648814247/profile-picture/xqj7u3y4r7utay35nzvh.png',
    email: 'jbrown@bgibson.com',
    password: 'password!1'
  });

  const priya = await User.create({
    name: 'Priya',
    username: 'Pea75x',
    image: 'https://i.ibb.co/Rh24p5n/festival-girl.jpg',
    email: 'priya_93_x@hotmail.co.uk',
    password: 'password!1'
  });

  const tania = await User.create({
    name: 'Tania',
    username: 'Tania',
    image: 'https://i.ibb.co/xSF8Q9M/girl-2.jpg',
    email: 'tania@tania.com',
    password: 'password!1'
  });

  const seededStations = await Station.create(data.stations);
  const seededPlaces = await Places.create(data.places);

  await Places.updateOne(
    { name: 'Tobacco Docks - Skylight' },

    {
      $push: {
        reviews: {
          comment: 'Where I come to cry. 10/10 would recommend',
          rating: 5,
          createdBy: edwardFoulds._id
        }
      }
    }
  );
  await Places.updateOne(
    { name: 'Tobacco Docks - Skylight' },

    {
      $push: {
        reviews: {
          comment: 'Great place! Delivery for tiddles...',
          rating: 2,
          createdBy: jimBrown._id
        }
      }
    }
  );
  await Places.updateOne(
    { name: 'Ruislip Lido' },

    {
      $push: {
        reviews: {
          comment: 'NICEEEEEEEEEE',
          rating: 5,
          createdBy: edwardFoulds._id
        }
      }
    }
  );

  await Places.updateOne(
    { name: 'Copeland Park & Bussey Building' },
    {
      $push: {
        reviews: {
          comment: 'went to a day rave here once. was goooooood',
          rating: 2,
          createdBy: eve._id
        }
      }
    }
  );

  await Places.updateOne(
    { name: 'Ruislip Lido' },
    {
      $push: {
        reviews: {
          comment: 'who knew there was a beach in london!',
          rating: 3,
          createdBy: tania._id
        }
      }
    }
  );

  await Places.updateOne(
    { name: 'Copeland Park & Bussey Building' },
    {
      $push: {
        reviews: {
          comment: 'Great atmosphere, lots of different cultures',
          rating: 5,
          createdBy: tania._id
        }
      }
    }
  );

  await Places.updateOne(
    { name: 'Copeland Park & Bussey Building' },
    {
      $push: {
        reviews: {
          comment:
            'Lovely cute bars and food places around here. Would make a great date destination.',
          rating: 5,
          createdBy: normalUser._id
        }
      }
    }
  );

  await Places.updateOne(
    { name: 'Ruislip Lido' },
    {
      $push: {
        reviews: {
          comment: 'Packed in the summer.',
          rating: 2,
          createdBy: eve._id
        }
      }
    }
  );

  await Places.updateOne(
    { name: 'Tobacco Docks - Skylight' },
    {
      $push: {
        reviews: {
          comment: 'Prettyyyy',
          rating: 5,
          createdBy: tania._id
        }
      }
    }
  );

  await Places.updateOne(
    { name: 'Tobacco Docks - Skylight' },
    {
      $push: {
        reviews: {
          comment:
            'Food heaven! Loved this place, great atmosphere, such a good selection of incredible foods on offer, can’t wait to return',
          rating: 5,
          createdBy: tania._id
        }
      }
    }
  );

  //! Seeding stations into places and places into stations
  seededPlaces.map((place) => {
    const stationNameArray = place.stationName;
    // console.log(stationNameArray);
    for (let i = 0; i < stationNameArray.length; i++) {
      // console.log(stationNameArray[i]);
      seededStations.map((station) => {
        // console.log('THis is the station: ', station.name);
        if (station.name === stationNameArray[i]) {
          // console.log('Add this');
          // console.log('Station ID: ', place.stationId);
          place.stationId.push(station._id);
          // console.log('Place with Station ID: ', place);
          station.places.push(place._id);
          // console.log('Station with Place ID: ', station);
        }
      });
    }
  });

  console.log('Seeded Places: ', seededPlaces.length);
  console.log('Seeded Stations: ', seededStations.length);

  await disconnetDb();
  console.log('disconnected!');
}

seed();
