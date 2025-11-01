import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getVeo3Service } from '@/lib/veo3';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const video = await prisma.video.findUnique({
      where: { id: params.id },
    });

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    // If video is still processing, check status with Veo3
    if (video.status === 'processing' && video.veo3JobId) {
      const veo3 = getVeo3Service();
      const jobStatus = await veo3.checkJobStatus(video.veo3JobId);

      // Update video status if changed
      if (jobStatus.status !== video.status) {
        const updated = await prisma.video.update({
          where: { id: params.id },
          data: {
            status: jobStatus.status,
            videoUrl: jobStatus.videoUrl || video.videoUrl,
          },
        });

        return NextResponse.json({
          id: updated.id,
          status: updated.status,
          videoUrl: updated.videoUrl,
          progress: jobStatus.status === 'completed' ? 100 :
                   jobStatus.status === 'processing' ? 50 : 0,
        });
      }
    }

    return NextResponse.json({
      id: video.id,
      status: video.status,
      videoUrl: video.videoUrl,
      progress: video.status === 'completed' ? 100 :
               video.status === 'processing' ? 50 : 0,
    });
  } catch (error) {
    console.error('Error checking video status:', error);
    return NextResponse.json(
      { error: 'Failed to check video status' },
      { status: 500 }
    );
  }
}
