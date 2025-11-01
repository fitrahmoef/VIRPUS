import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const CreateBookSchema = z.object({
  title: z.string().min(1).max(200),
  author: z.string().min(1).max(100),
  coverEmoji: z.string(),
  coverGradient: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CreateBookSchema.parse(body);

    const book = await prisma.book.create({
      data: validatedData,
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error('Error creating book:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const trending = searchParams.get('trending') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');

    const books = await prisma.book.findMany({
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
      orderBy: trending
        ? { videoCount: 'desc' }
        : { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}
