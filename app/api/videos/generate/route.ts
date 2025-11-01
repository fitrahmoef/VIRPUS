import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getVeo3Service } from '@/lib/veo3';

// Request validation schema
const VideoGenerationSchema = z.object({
  title: z.string().min(1).max(200),
  prompt: z.string().min(10).max(2000),
  style: z.enum(['anime', 'flat-design', '3d-realistic']),
  duration: z.number().min(15).max(90),
  userId: z.string(),
  bookId: z.string().optional(),
  description: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = VideoGenerationSchema.parse(body);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: validatedData.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Initialize Veo3 service
    const veo3 = getVeo3Service();

    // Start video generation
    console.log('Starting video generation:', validatedData);

    const generationResult = await veo3.generateVideo({
      prompt: validatedData.prompt,
      style: validatedData.style,
      duration: validatedData.duration,
      aspectRatio: '16:9',
    });

    // Create video record in database
    const video = await prisma.video.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        prompt: validatedData.prompt,
        style: validatedData.style,
        duration: validatedData.duration,
        status: 'processing',
        veo3JobId: generationResult.jobId,
        thumbnailEmoji: '🎬',
        thumbnailGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        userId: validatedData.userId,
        bookId: validatedData.bookId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    console.log('Video record created:', video.id);

    return NextResponse.json({
      success: true,
      video: {
        id: video.id,
        title: video.title,
        status: video.status,
        jobId: generationResult.jobId,
        estimatedTime: '2-3 minutes',
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Video generation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate video', message: String(error) },
      { status: 500 }
    );
  }
}
