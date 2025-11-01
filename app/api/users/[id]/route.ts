import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        videos: {
          orderBy: { createdAt: 'desc' },
          include: {
            book: {
              select: {
                id: true,
                title: true,
                author: true,
              },
            },
          },
        },
        bookmarks: {
          include: {
            book: true,
          },
        },
        _count: {
          select: {
            videos: true,
            bookmarks: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Calculate total views
    const totalViews = user.videos.reduce((sum, video) => sum + video.viewCount, 0);

    return NextResponse.json({
      ...user,
      stats: {
        videosCreated: user._count.videos,
        totalViews,
        points: user.points,
        rank: user.rank || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
