const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Delete in FK-safe order
  await prisma.watchlistMovie.deleteMany();
  await prisma.review.deleteMany();
  await prisma.watchlist.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.user.deleteMany();
  console.log('Cleared all tables');

  // Create users
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const alice = await prisma.user.create({
    data: { username: 'alice', email: 'alice@example.com', passwordHash }
  });
  console.log(`Created user: alice (id=${alice.id})`);

  const bob = await prisma.user.create({
    data: { username: 'bob', email: 'bob@example.com', passwordHash }
  });
  console.log(`Created user: bob (id=${bob.id})`);

  // Create 4 movies owned by alice
  const inception = await prisma.movie.create({
    data: { userId: alice.id, title: 'Inception', releaseYear: 2010, genre: 'Sci-Fi' }
  });
  console.log(`Created movie: Inception (id=${inception.id})`);

  const godfather = await prisma.movie.create({
    data: { userId: alice.id, title: 'The Godfather', releaseYear: 1972, genre: 'Drama' }
  });
  console.log(`Created movie: The Godfather (id=${godfather.id})`);

  const parasite = await prisma.movie.create({
    data: { userId: alice.id, title: 'Parasite', releaseYear: 2019, genre: 'Thriller' }
  });
  console.log(`Created movie: Parasite (id=${parasite.id})`);

  const interstellar = await prisma.movie.create({
    data: { userId: alice.id, title: 'Interstellar', releaseYear: 2014, genre: 'Sci-Fi' }
  });
  console.log(`Created movie: Interstellar (id=${interstellar.id})`);

  // Create 2 watchlists owned by alice
  const weekendWatch = await prisma.watchlist.create({
    data: { userId: alice.id, name: 'Weekend Watch', isPublic: true }
  });
  console.log(`Created watchlist: Weekend Watch (id=${weekendWatch.id})`);

  const privateList = await prisma.watchlist.create({
    data: { userId: alice.id, name: 'Private List', isPublic: false }
  });
  console.log(`Created watchlist: Private List (id=${privateList.id})`);

  // Create WatchlistMovie entries
  const wm1 = await prisma.watchlistMovie.create({
    data: { watchlistId: weekendWatch.id, movieId: inception.id, status: 'watched' }
  });
  console.log(`Created WatchlistMovie: Weekend Watch + Inception (id=${wm1.id})`);

  const wm2 = await prisma.watchlistMovie.create({
    data: { watchlistId: weekendWatch.id, movieId: interstellar.id, status: 'want' }
  });
  console.log(`Created WatchlistMovie: Weekend Watch + Interstellar (id=${wm2.id})`);

  const wm3 = await prisma.watchlistMovie.create({
    data: { watchlistId: privateList.id, movieId: godfather.id, status: 'watching' }
  });
  console.log(`Created WatchlistMovie: Private List + The Godfather (id=${wm3.id})`);

  // Create 3 reviews
  const review1 = await prisma.review.create({
    data: { userId: alice.id, movieId: inception.id, rating: 5, body: 'Mind-blowing masterpiece' }
  });
  console.log(`Created review: alice on Inception (id=${review1.id})`);

  const review2 = await prisma.review.create({
    data: { userId: alice.id, movieId: godfather.id, rating: 5, body: 'Greatest film ever made' }
  });
  console.log(`Created review: alice on The Godfather (id=${review2.id})`);

  const review3 = await prisma.review.create({
    data: { userId: bob.id, movieId: parasite.id, rating: 4, body: 'Brilliantly crafted' }
  });
  console.log(`Created review: bob on Parasite (id=${review3.id})`);

  console.log('Seed complete.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
