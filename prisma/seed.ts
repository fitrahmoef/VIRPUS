import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'rina@example.com' },
    update: {},
    create: {
      name: 'Rina Mahasiswa',
      email: 'rina@example.com',
      avatar: 'R',
      badge: 'Virpus Creator',
      points: 2450,
      rank: 12,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'andi@example.com' },
    update: {},
    create: {
      name: 'Andi Creator',
      email: 'andi@example.com',
      avatar: 'A',
      badge: 'Rising Star',
      points: 1800,
      rank: 25,
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'dina@example.com' },
    update: {},
    create: {
      name: 'Dina Visualizer',
      email: 'dina@example.com',
      avatar: 'D',
      badge: 'Viral Master',
      points: 3200,
      rank: 5,
    },
  });

  console.log('Users created:', { user1, user2, user3 });

  // Create sample books
  const book1 = await prisma.book.create({
    data: {
      title: 'Nusantara 2157',
      author: 'Ahmad Fuadi',
      coverEmoji: '📖',
      coverGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      videoCount: 234,
      likeCount: 1200,
      description: 'A futuristic vision of Indonesia in 2157',
      content: 'Arya melangkah keluar dari stasiun MRT bawah tanah. Sinar matahari sore menyilaukan matanya yang sudah terbiasa dengan cahaya neon selama tujuh jam terakhir...',
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: 'Hujan',
      author: 'Tere Liye',
      coverEmoji: '📚',
      coverGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      videoCount: 189,
      likeCount: 956,
      description: 'A magical tale of love and adventure',
    },
  });

  const book3 = await prisma.book.create({
    data: {
      title: 'Bumi Manusia',
      author: 'Pramoedya A.T.',
      coverEmoji: '📕',
      coverGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      videoCount: 312,
      likeCount: 2100,
      description: 'The first book in the Buru Quartet',
    },
  });

  const book4 = await prisma.book.create({
    data: {
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      coverEmoji: '📗',
      coverGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      videoCount: 456,
      likeCount: 3400,
      description: 'An inspiring story from Belitung',
    },
  });

  console.log('Books created:', { book1, book2, book3, book4 });

  // Create sample videos
  const video1 = await prisma.video.create({
    data: {
      title: 'Jakarta 2157: The Future',
      description: 'A cyberpunk visualization of future Jakarta',
      prompt: 'Futuristic Jakarta with hologram advertisements, skytrain, cyberpunk style',
      style: 'anime',
      duration: 45,
      status: 'completed',
      thumbnailEmoji: '🎬',
      thumbnailGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      videoUrl: 'https://example.com/video1.mp4',
      viewCount: 1200000,
      likeCount: 45000,
      commentCount: 1200,
      userId: user1.id,
      bookId: book1.id,
    },
  });

  const video2 = await prisma.video.create({
    data: {
      title: 'Minke\'s Journey Visualized',
      description: 'Bringing Bumi Manusia characters to life',
      prompt: 'Colonial era Java, Minke character in anime style',
      style: 'anime',
      duration: 60,
      status: 'completed',
      thumbnailEmoji: '🎨',
      thumbnailGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      videoUrl: 'https://example.com/video2.mp4',
      viewCount: 890000,
      likeCount: 32000,
      commentCount: 890,
      userId: user2.id,
      bookId: book3.id,
    },
  });

  const video3 = await prisma.video.create({
    data: {
      title: 'Laskar Pelangi Reimagined',
      description: 'The rainbow warriors in beautiful 3D',
      prompt: 'Indonesian children in school, Belitung island, colorful 3D realistic style',
      style: '3d-realistic',
      duration: 90,
      status: 'completed',
      thumbnailEmoji: '✨',
      thumbnailGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      videoUrl: 'https://example.com/video3.mp4',
      viewCount: 2100000,
      likeCount: 67000,
      commentCount: 1500,
      userId: user3.id,
      bookId: book4.id,
    },
  });

  console.log('Videos created:', { video1, video2, video3 });

  console.log('Database seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
